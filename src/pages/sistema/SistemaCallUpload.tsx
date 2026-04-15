import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Play, AlertCircle, Loader2 } from 'lucide-react';
import { db, storage } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp, setDoc, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../contexts/AuthContext';

export const SistemaCallUpload = () => {
    const { user, activeWorkspaceId } = useAuth();
    const navigate = useNavigate();

    const [uploadType, setUploadType] = useState<'audio' | 'transcript'>('audio');

    // Form fields
    const [title, setTitle] = useState('');
    const [leadName, setLeadName] = useState('');
    const [callType, setCallType] = useState('discovery');
    const [dealStage, setDealStage] = useState('new');

    // Audio upload state
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Transcript text state
    const [transcriptText, setTranscriptText] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.size > 15 * 1024 * 1024) {
                setError('El archivo supera el límite de 15 MB para procesamiento directo. Por favor, comprímelo o pega la transcripción en la otra pestaña.');
                setFile(null);
                e.target.value = ''; // Reset input
                return;
            }
            setError('');
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!activeWorkspaceId) {
            setError('Error: No se encontró un Workspace activo. Por favor, recarga la página o cierra sesión.');
            return;
        }

        if (!title || !leadName) {
            setError('Título y Nombre del Lead son obligatorios.');
            return;
        }

        if (uploadType === 'audio' && !file) {
            setError('Por favor selecciona un archivo de audio.');
            return;
        }

        if (uploadType === 'transcript' && !transcriptText.trim()) {
            setError('Por favor ingresa la transcripción de la llamada.');
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Create initial Firestore document
            const callDocRef = await addDoc(collection(db, 'calls'), {
                workspaceId: activeWorkspaceId,
                createdBy: user?.uid || 'unknown',
                closerName: user?.displayName || 'Unknown Closer',
                title,
                leadName,
                callType,
                dealStage,
                date: new Date().toISOString().split('T')[0], // Today
                status: 'uploaded',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            let downloadUrl = null;
            let currentTranscript = uploadType === 'transcript' ? transcriptText : null;

            // 2. Upload file if audio
            if (uploadType === 'audio' && file) {
                const storageRef = ref(storage, `workspaces/${activeWorkspaceId}/calls/${callDocRef.id}/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                await new Promise<void>((resolve, reject) => {
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            setUploadProgress(progress);
                        },
                        (error) => {
                            reject(error);
                        },
                        async () => {
                            downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                            // Update doc with audioPath
                            await setDoc(callDocRef, {
                                audioPath: storageRef.fullPath,
                                audioFileName: file.name
                            }, { merge: true });
                            resolve();
                        }
                    );
                });
            } else if (uploadType === 'transcript') {
                await setDoc(callDocRef, {
                    transcript: currentTranscript,
                    transcriptSource: 'pasted'
                }, { merge: true });
            }

            // 3. Trigger Backend Analysis Analysis (Vercel Serverless Function)
            await setDoc(callDocRef, { status: 'analyzing' }, { merge: true });

            // Navigate to the detail page immediately so the user sees the "ANALYZING" state
            navigate(`/sistema/app/calls/${callDocRef.id}`);

            // 3.5 Fetch Workspace Playbook Context
            let playbookContext = '';
            try {
                const pbRef = doc(db, 'workspace_playbooks', activeWorkspaceId);
                const pbSnap = await getDoc(pbRef);
                if (pbSnap.exists()) {
                    playbookContext = JSON.stringify(pbSnap.data());
                }
            } catch (err) {
                console.error("No se pudo cargar el playbook:", err);
            }

            // Execute the analysis and update Firestore from the client side
            try {
                const res = await fetch('/api/analyze-call', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        callId: callDocRef.id,
                        workspaceId: activeWorkspaceId,
                        transcript: currentTranscript,
                        downloadUrl: downloadUrl,
                        playbookContext: playbookContext
                    })
                });

                const data = await res.json();

                if (data.success && data.analysis) {
                    await setDoc(callDocRef, {
                        status: 'analyzed',
                        analysis: data.analysis
                    }, { merge: true });
                } else {
                    await setDoc(callDocRef, { status: 'failed', errorMessage: data.error || 'Server returned false success' }, { merge: true });
                    console.error("Backend returned error:", data.error);
                }
            } catch (err: any) {
                console.error("Fetch error:", err);
                await setDoc(callDocRef, { status: 'failed', errorMessage: err.message || 'Fetch connection error' }, { merge: true });
            }

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error inesperado al subir la llamada.');
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '40px' }}>
            <div className="sis-page-header">
                <div className="sis-page-title">Analizar Nueva Llamada</div>
                <div className="sis-page-subtitle">Sube el audio o pega la transcripción para que el Coach IA lo evalúe.</div>
            </div>

            {error && (
                <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#ef4444', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="sis-card-static">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '8px' }}>Título de la Llamada</label>
                        <input
                            type="text"
                            className="sis-input"
                            placeholder="Ej. Demo con Grupo Riviera"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '8px' }}>Nombre del Lead</label>
                        <input
                            type="text"
                            className="sis-input"
                            placeholder="Ej. Martín Suárez"
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '8px' }}>Tipo de Llamada</label>
                        <select className="sis-input" value={callType} onChange={(e) => setCallType(e.target.value)} disabled={isSubmitting}>
                            <option value="discovery">Discovery</option>
                            <option value="sales">Sales Call / Demo</option>
                            <option value="follow_up">Follow Up</option>
                            <option value="closing">Closing</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '8px' }}>Etapa del Deal</label>
                        <select className="sis-input" value={dealStage} onChange={(e) => setDealStage(e.target.value)} disabled={isSubmitting}>
                            <option value="new">Nuevo</option>
                            <option value="contacted">Contactado</option>
                            <option value="proposal">Propuesta</option>
                            <option value="negotiation">Negociación</option>
                        </select>
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--sis-text-primary)', marginBottom: '12px' }}>Fuente de la Llamada</label>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            type="button"
                            onClick={() => setUploadType('audio')}
                            style={{
                                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                padding: '14px', borderRadius: '8px', border: `1px solid ${uploadType === 'audio' ? 'var(--sis-accent)' : 'var(--sis-border)'}`,
                                background: uploadType === 'audio' ? 'var(--sis-accent-subtle)' : 'var(--sis-bg-secondary)',
                                color: uploadType === 'audio' ? 'var(--sis-accent)' : 'var(--sis-text-muted)',
                                cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            <Upload size={18} />
                            <span style={{ fontWeight: 600 }}>Subir Audio (MP3/WAV)</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setUploadType('transcript')}
                            style={{
                                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                padding: '14px', borderRadius: '8px', border: `1px solid ${uploadType === 'transcript' ? 'var(--sis-accent)' : 'var(--sis-border)'}`,
                                background: uploadType === 'transcript' ? 'var(--sis-accent-subtle)' : 'var(--sis-bg-secondary)',
                                color: uploadType === 'transcript' ? 'var(--sis-accent)' : 'var(--sis-text-muted)',
                                cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            <FileText size={18} />
                            <span style={{ fontWeight: 600 }}>Pegar Transcripción</span>
                        </button>
                    </div>
                </div>

                {uploadType === 'audio' ? (
                    <div style={{
                        border: '2px dashed var(--sis-border)', borderRadius: '12px', padding: '40px',
                        textAlign: 'center', marginBottom: '24px', background: 'var(--sis-bg-secondary)',
                        position: 'relative'
                    }}>
                        <input
                            type="file"
                            accept="audio/mp3,audio/wav,audio/m4a,video/mp4"
                            onChange={handleFileChange}
                            disabled={isSubmitting}
                            style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                opacity: 0, cursor: isSubmitting ? 'not-allowed' : 'pointer'
                            }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--sis-accent-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sis-accent)' }}>
                                <Play size={24} />
                            </div>
                            {file ? (
                                <div>
                                    <div style={{ fontWeight: 600, color: 'var(--sis-text-primary)' }}>{file.name}</div>
                                    <div style={{ fontSize: '13px', color: 'var(--sis-text-muted)' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ fontWeight: 600, color: 'var(--sis-text-primary)' }}>Hacé clic o arrastrá el archivo de audio</div>
                                    <div style={{ fontSize: '13px', color: 'var(--sis-text-muted)' }}>MP3, WAV, M4A, hasta 15MB (Gemini Flash procesará esto)</div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div style={{ marginBottom: '24px' }}>
                        <textarea
                            className="sis-input"
                            rows={12}
                            placeholder="Speaker 1: Hola, habla Jeremías...&#10;Speaker 2: Hola Jeremías, sí te escucho..."
                            value={transcriptText}
                            onChange={(e) => setTranscriptText(e.target.value)}
                            disabled={isSubmitting}
                            style={{ width: '100%', resize: 'vertical' }}
                        />
                    </div>
                )}

                {isSubmitting && uploadType === 'audio' && uploadProgress > 0 && uploadProgress < 100 && (
                    <div style={{ marginBottom: '24px' }}>
                        <div style={{ height: '6px', background: 'var(--sis-border)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${uploadProgress}%`, background: 'var(--sis-accent)', transition: 'width 0.2s' }} />
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--sis-text-muted)', textAlign: 'right', marginTop: '4px' }}>
                            Subiendo archivo... {Math.round(uploadProgress)}%
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <button
                        type="button"
                        className="sis-btn-outline"
                        onClick={() => navigate('/sistema/app/calls')}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="sis-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Procesando...
                            </>
                        ) : (
                            'Analizar Llamada'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};
