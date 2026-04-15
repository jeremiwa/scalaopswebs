import { WindowChrome } from './ui/WindowChrome';
import { LayoutDashboard, BellRing, BarChart3 } from 'lucide-react';

export const ProductProof = () => {
  return (
    <section className="section-padding bg-scala-bg border-t border-white/5">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Así se ve cuando el sistema está ordenado
          </h2>
          <p className="text-lg text-white/50">
            Visibilidad total, control de tiempos y procesos estandarizados.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Shot 1 */}
          <div className="space-y-6">
            <WindowChrome className="h-64">
              <div className="bg-[#0B0F14] h-full p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-white/60">
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="text-xs font-medium">Pipeline Estructurado</span>
                </div>
                <div className="flex gap-2 flex-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex-1 bg-white/5 rounded-lg p-2 space-y-2">
                      <div className="w-1/2 h-2 bg-white/20 rounded-full mb-4"></div>
                      <div className="h-12 bg-white/5 rounded border border-white/10"></div>
                      <div className="h-12 bg-white/5 rounded border border-white/10"></div>
                    </div>
                  ))}
                </div>
              </div>
            </WindowChrome>
            <div>
              <h4 className="text-white font-semibold mb-2">Pipeline con estados claros</h4>
              <p className="text-sm text-white/50">Saber exactamente dónde está cada oportunidad y qué paso sigue.</p>
            </div>
          </div>

          {/* Shot 2 */}
          <div className="space-y-6">
            <WindowChrome className="h-64">
              <div className="bg-[#0B0F14] h-full p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-white/60">
                  <BellRing className="w-4 h-4" />
                  <span className="text-xs font-medium">Alertas y SLA</span>
                </div>
                <div className="space-y-3 flex-1">
                  <div className="bg-[#FF5F56]/10 border border-[#FF5F56]/20 rounded-lg p-3 flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="w-24 h-2 bg-[#FF5F56]/50 rounded-full"></div>
                      <div className="w-16 h-2 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="text-xs font-bold text-[#FF5F56]">Venció SLA</div>
                  </div>
                  <div className="bg-scala-green/10 border border-scala-green/20 rounded-lg p-3 flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="w-32 h-2 bg-scala-green/50 rounded-full"></div>
                      <div className="w-20 h-2 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="text-xs font-bold text-scala-green">A tiempo</div>
                  </div>
                </div>
              </div>
            </WindowChrome>
            <div>
              <h4 className="text-white font-semibold mb-2">Control de tiempos (SLA)</h4>
              <p className="text-sm text-white/50">Alertas automáticas cuando un lead lleva demasiado tiempo sin respuesta.</p>
            </div>
          </div>

          {/* Shot 3 */}
          <div className="space-y-6">
            <WindowChrome className="h-64">
              <div className="bg-[#0B0F14] h-full p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-white/60">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-xs font-medium">Dashboard de Conversión</span>
                </div>
                <div className="flex-1 flex items-end gap-2 pb-2">
                  {[40, 70, 45, 90, 65, 80].map((h, i) => (
                    <div key={i} className="flex-1 bg-scala-green/20 rounded-t-sm relative group">
                      <div className="absolute bottom-0 w-full bg-scala-green rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </WindowChrome>
            <div>
              <h4 className="text-white font-semibold mb-2">Métricas en tiempo real</h4>
              <p className="text-sm text-white/50">Tasa de cierre por vendedor, motivos de pérdida y ROI de campañas.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
