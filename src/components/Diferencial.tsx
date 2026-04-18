export const Diferencial = () => {
  return (
    <section className="relative" style={{ background: '#000000', padding: '130px 0' }}>
      <div className="container-custom relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 reveal">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(107, 221, 161,0.06)', border: '1px solid rgba(107, 221, 161,0.12)', borderRadius: '100px', fontSize: '14px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6EE7A0', marginBottom: '20px' }}>
            CÓMO SOMOS DISTINTOS
          </span>
          <h2 className="mx-auto" style={{ fontSize: '48px', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '16px' }}>
            No somos una agencia.<br />Tampoco vendemos software.
          </h2>
        </div>

        {/* Table in Premium Card */}
        <div className="card-premium mb-12 w-full reveal" style={{
          maxWidth: '800px', margin: '32px auto 0', padding: '1px', borderRadius: '24px',
          background: 'linear-gradient(145deg, rgba(107, 221, 161,0.15) 0%, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.03) 60%, rgba(107, 221, 161,0.10) 100%)',
          transition: 'all 0.4s ease'
        }}>
          <div style={{ background: '#050505', borderRadius: '23px', padding: '40px 36px' }}>
            <div className="comparison-table">

              {/* HEADER ROW */}
              <div className="comp-row comp-header">
                <div className="comp-cell comp-criteria"></div>
                <div className="comp-cell comp-col-header">Agencia<br />de MKT</div>
                <div className="comp-cell comp-col-header">Software<br />CRM</div>
                <div className="comp-cell comp-col-header">Coach /<br />Consultor</div>
                <div className="comp-cell comp-col-header comp-col-scala">SCALA</div>
              </div>

              {/* ROW 1 */}
              <div className="comp-row">
                <div className="comp-cell comp-criteria">Escucha tus llamadas y chats reales</div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell comp-cell-scala"><span className="comp-yes">✓</span></div>
              </div>

              {/* ROW 2 */}
              <div className="comp-row">
                <div className="comp-cell comp-criteria">Implementa el proceso en tu negocio</div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell comp-cell-scala"><span className="comp-yes">✓</span></div>
              </div>

              {/* ROW 3 */}
              <div className="comp-row">
                <div className="comp-cell comp-criteria">Reescribe los guiones de venta</div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell"><span className="comp-partial">~</span></div>
                <div className="comp-cell comp-cell-scala"><span className="comp-yes">✓</span></div>
              </div>

              {/* ROW 4 */}
              <div className="comp-row">
                <div className="comp-cell comp-criteria">Configura el CRM y automatizaciones</div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell"><span className="comp-partial">~</span></div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell comp-cell-scala"><span className="comp-yes">✓</span></div>
              </div>

              {/* ROW 5 */}
              <div className="comp-row">
                <div className="comp-cell comp-criteria">Entrena a tu equipo con casos reales</div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell"><span className="comp-partial">~</span></div>
                <div className="comp-cell comp-cell-scala"><span className="comp-yes">✓</span></div>
              </div>

              {/* ROW 6 */}
              <div className="comp-row">
                <div className="comp-cell comp-criteria">Instala tablero de métricas en vivo</div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell"><span className="comp-partial">~</span></div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell comp-cell-scala"><span className="comp-yes">✓</span></div>
              </div>

              {/* ROW 7 */}
              <div className="comp-row">
                <div className="comp-cell comp-criteria">Todo listo en 30 días</div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell"><span className="comp-no">✕</span></div>
                <div className="comp-cell comp-cell-scala"><span className="comp-yes">✓</span></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
