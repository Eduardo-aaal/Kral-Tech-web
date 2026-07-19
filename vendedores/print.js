// Print functionality for Kral Tech - Propuesta Comercial para Clientes
function printServiceInfo(serviceType) {
  const printWindow = window.open("", "_blank");

  let content = "";

  if (serviceType === "landing") {
    content = getLandingContent();
  } else if (serviceType === "corporativa") {
    content = getCorporativaContent();
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Kral Tech - Propuesta Comercial</title>
      <style>
        @page { margin: 15mm; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; 
          color: #2c3e50; 
          padding: 0;
          line-height: 1.6;
        }
        
        /* Portada */
        .portada {
          text-align: center;
          padding: 50px 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 20px;
          margin-bottom: 35px;
          page-break-after: avoid;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        .portada .logo-container {
          margin-bottom: 24px;
        }
        .portada .logo-img {
          max-width: 100px;
          height: auto;
          display: block;
          margin: 0 auto 16px;
          filter: brightness(0) invert(1);
        }
        .portada .logo-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 16px;
          font-weight: 800;
          font-size: 32px;
          font-family: 'Courier New', monospace;
          margin-bottom: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
        .portada h1 { 
          font-size: 32px; 
          font-weight: 800; 
          margin-bottom: 10px;
          letter-spacing: -0.5px;
        }
        .portada .subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 20px;
        }
        .portada .badge-propuesta {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.4);
          padding: 8px 24px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          color: white;
          backdrop-filter: blur(10px);
        }
        
        /* Contenido */
        .content { padding: 0 10px; }
        
        .section { 
          margin-bottom: 35px; 
          page-break-inside: avoid;
        }
        
        .section h2 {
          font-size: 22px;
          color: #667eea;
          margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 3px solid #667eea;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .section h2::before {
          content: '';
          display: inline-block;
          width: 5px;
          height: 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 3px;
        }
        
        /* Features grid */
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 24px;
          background: #f8f9fa;
          border-radius: 14px;
          padding: 24px 28px;
          border-left: 4px solid #667eea;
        }
        .features-grid .item {
          font-size: 13.5px;
          padding: 6px 0;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #2c3e50;
        }
        .features-grid .item .check {
          color: #00d4aa;
          font-weight: bold;
          font-size: 16px;
        }
        
        /* Plan cards */
        .plan {
          margin-bottom: 18px;
          padding: 24px 28px;
          border: 2px solid #e9ecef;
          border-radius: 14px;
          page-break-inside: avoid;
          position: relative;
          background: white;
          transition: all 0.3s;
        }
        .plan.popular {
          border-color: #667eea;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15);
        }
        .plan .popular-tag {
          position: absolute;
          top: -12px;
          right: 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 5px 16px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }
        .plan-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .plan-header h3 { 
          font-size: 18px; 
          color: #2c3e50;
          font-weight: 700;
        }
        .plan-header .price { 
          font-size: 24px; 
          font-weight: 800; 
          color: #667eea;
        }
        .plan-header .price-sub { 
          font-size: 13px; 
          color: #7f8c8d; 
          font-weight: 500;
          display: block;
          text-align: right;
        }
        .plan ul { 
          list-style: none; 
          padding: 0;
          margin: 12px 0;
        }
        .plan ul li { 
          padding: 5px 0; 
          font-size: 13px; 
          color: #34495e;
          break-inside: avoid;
        }
        .plan ul li::before { 
          content: "✓ "; 
          color: #00d4aa; 
          font-weight: bold;
          font-size: 14px;
        }
        
        .value-box {
          margin-top: 12px;
          padding: 12px 16px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border-left: 4px solid #667eea;
          border-radius: 8px;
          font-size: 13px;
        }
        .value-box .label { 
          color: #7f8c8d; 
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .value-box .value { 
          font-weight: 700; 
          color: #667eea; 
          font-size: 18px; 
          margin-top: 4px;
        }
        
        .cta-box {
          margin-top: 25px;
          padding: 20px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 14px;
          text-align: center;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
        }
        .cta-box h3 { 
          font-size: 20px; 
          margin-bottom: 8px;
          font-weight: 700;
        }
        .cta-box p { 
          font-size: 14px; 
          opacity: 0.95;
        }
        
        .footer-propuesta {
          text-align: center;
          padding: 28px 40px;
          border-top: 2px solid #e9ecef;
          margin-top: 30px;
          font-size: 12px;
          color: #7f8c8d;
        }
        .footer-propuesta strong { 
          color: #667eea;
          font-weight: 700;
        }
        
        .plan-badge-small {
          display: inline-block;
          background: #f0f0ff;
          color: #667eea;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          margin-top: 6px;
        }
        
        .plan-footer-box {
          margin-top: 14px;
          padding: 10px 14px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 3px solid #00d4aa;
        }
        .plan-footer-label {
          font-size: 11px;
          color: #7f8c8d;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .plan-footer-value {
          font-size: 14px;
          color: #2c3e50;
          font-weight: 600;
        }
        
        .benefits-section {
          background: white;
          padding: 28px;
          border-radius: 14px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }
        
        .benefits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 16px;
        }
        .benefit-item {
          padding: 16px;
          background: #f8f9fa;
          border-radius: 10px;
          border-left: 3px solid #00d4aa;
        }
        .benefit-icon {
          font-size: 28px;
          margin-bottom: 8px;
        }
        .benefit-title {
          font-size: 14px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 4px;
        }
        .benefit-desc {
          font-size: 12px;
          color: #7f8c8d;
          line-height: 1.4;
        }
        
        .page-break { page-break-before: always; }
        @media print { 
          .no-print { display: none; } 
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      </style>
    </head>
    <body>
      <div class="portada">
        <div class="logo-container">
          <img class="logo-img" src="../samples/logo.png" alt="Kral Tech Solutions" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-flex';" />
          <div class="logo-icon" style="display:none;"></></div>
        </div>
        <h1>Kral Tech</h1>
        <p>Propuesta Comercial</p>
        <div class="badge-propuesta">${serviceType === "landing" ? "Landing Pages" : "Páginas Corporativas"}</div>
      </div>
      <div class="content">
        ${content}
      </div>
      <div class="footer-propuesta">
        <p><strong>Kral Tech</strong> — www.kraltech.cl</p>
        <p>Contacto: contacto@kraltech.cl | WhatsApp: +56 9 1234 5678</p>
      </div>
      <script>
        window.print();
        window.close();
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function getLandingContent() {
  return `
    <div class="section">
      <h2>¿Qué incluye tu Landing Page?</h2>
      <p style="color: #7f8c8d; margin-bottom: 16px; font-size: 14px;">Todo lo que necesitas para tener presencia profesional en internet</p>
      <div class="features-grid">
        <div class="item"><span class="check">✓</span> Diseño 100% personalizado</div>
        <div class="item"><span class="check">✓</span> Adaptada a móviles y tablets</div>
        <div class="item"><span class="check">✓</span> Experiencia de usuario profesional</div>
        <div class="item"><span class="check">✓</span> Certificado de seguridad SSL</div>
        <div class="item"><span class="check">✓</span> Integración con Google Maps</div>
        <div class="item"><span class="check">✓</span> Optimización SEO básica</div>
        <div class="item"><span class="check">✓</span> Correo corporativo incluido</div>
        <div class="item"><span class="check">✓</span> Una página web profesional</div>
      </div>
    </div>

    <div class="section">
      <h2>Planes y Precios</h2>
      <p style="color: #7f8c8d; margin-bottom: 20px; font-size: 14px;">Elige el plan que mejor se adapte a tus necesidades</p>
      
      <div class="plan">
        <div class="plan-header">
          <div>
            <h3>Plan Compra</h3>
            <span class="plan-badge-small">Pago único</span>
          </div>
          <div style="text-align: right;">
            <div class="price">$180.000</div>
          </div>
        </div>
        <ul>
          <li>✓ Hosting y Dominio por 1 año</li>
          <li>✓ Diseño personalizado y profesional</li>
          <li>✓ Certificado SSL incluido</li>
          <li>✓ SEO básico para Google</li>
          <li>✓ Sin tiempo mínimo de permanencia</li>
        </ul>
        <div class="plan-footer-box">
          <div class="plan-footer-label">Ideal para:</div>
          <div class="plan-footer-value">Proyectos que prefieren inversión única</div>
        </div>
      </div>

      <div class="plan popular">
        <div class="popular-tag">⭐ MÁS POPULAR</div>
        <div class="plan-header">
          <div>
            <h3>Plan Crecimiento</h3>
            <span class="plan-badge-small">Soporte continuo</span>
          </div>
          <div style="text-align: right;">
            <div class="price">$90.000</div>
            <div class="price-sub">+ $20.000/mes</div>
          </div>
        </div>
        <ul>
          <li>✓ Todo lo del Plan Compra, más:</li>
          <li>✓ Hosting y Dominio mientras dure el plan</li>
          <li>✓ Soporte técnico prioritario</li>
          <li>✓ 2 cambios menores al mes</li>
          <li>✓ Monitoreo mensual</li>
        </ul>
        <div class="plan-footer-box">
          <div class="plan-footer-label">Inversión total (6 meses):</div>
          <div class="plan-footer-value">$210.000</div>
        </div>
      </div>

      <div class="plan">
        <div class="plan-header">
          <div>
            <h3>Plan Emprende</h3>
            <span class="plan-badge-small">Inversión inicial $0</span>
          </div>
          <div style="text-align: right;">
            <div class="price">$0</div>
            <div class="price-sub">+ $24.990/mes</div>
          </div>
        </div>
        <ul>
          <li>✓ Todo lo del Plan Crecimiento, más:</li>
          <li>✓ Sin inversión inicial</li>
          <li>✓ Ideal para emprendedores</li>
          <li>✓ Opción: $10.000 por 4 meses</li>
        </ul>
        <div class="plan-footer-box">
          <div class="plan-footer-label">Inversión total (12 meses):</div>
          <div class="plan-footer-value">$299.880</div>
        </div>
      </div>
    </div>

    <div class="section benefits-section">
      <h2>Beneficios que obtienes</h2>
      <div class="benefits-grid">
        <div class="benefit-item">
          <div class="benefit-icon">🎯</div>
          <div class="benefit-title">Diseño Profesional</div>
          <div class="benefit-desc">Genera confianza y credibilidad en tus clientes</div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">🌐</div>
          <div class="benefit-title">Presencia 24/7</div>
          <div class="benefit-desc">Tu negocio visible en internet todo el día</div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">📈</div>
          <div class="benefit-title">Más Visibilidad</div>
          <div class="benefit-desc">Aparece en Google y atrae más clientes</div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">💬</div>
          <div class="benefit-title">Soporte Continuo</div>
          <div class="benefit-desc">Te acompañamos en todo momento</div>
        </div>
      </div>
    </div>

    <div class="cta-box">
      <h3>¿Listo para comenzar?</h3>
      <p>Contáctanos hoy y lleva tu negocio al siguiente nivel</p>
    </div>
  `;
}

function getCorporativaContent() {
  return `
    <div class="section">
      <h2>¿Qué incluye tu Página Corporativa?</h2>
      <p style="color: #7f8c8d; margin-bottom: 16px; font-size: 14px;">Una presencia web completa y profesional para tu empresa</p>
      <div class="features-grid">
        <div class="item"><span class="check">✓</span> Hasta 5 páginas web personalizadas</div>
        <div class="item"><span class="check">✓</span> Diseño profesional y moderno</div>
        <div class="item"><span class="check">✓</span> Adaptada a todos los dispositivos</div>
        <div class="item"><span class="check">✓</span> Certificado de seguridad SSL</div>
        <div class="item"><span class="check">✓</span> Integración con Google Maps</div>
        <div class="item"><span class="check">✓</span> SEO avanzado para posicionamiento</div>
        <div class="item"><span class="check">✓</span> 3 cuentas de correo corporativo</div>
        <div class="item"><span class="check">✓</span> Panel para administrar contenido</div>
      </div>
    </div>

    <div class="section">
      <h2>Planes y Precios</h2>
      <p style="color: #7f8c8d; margin-bottom: 20px; font-size: 14px;">Soluciones flexibles para cada etapa de tu negocio</p>
      
      <div class="plan">
        <div class="plan-header">
          <div>
            <h3>Plan Compra Corp.</h3>
            <span class="plan-badge-small">Pago único</span>
          </div>
          <div style="text-align: right;">
            <div class="price">$350.000</div>
          </div>
        </div>
        <ul>
          <li>✓ Hasta 5 páginas web profesionales</li>
          <li>✓ Diseño personalizado</li>
          <li>✓ SEO avanzado incluido</li>
          <li>✓ 3 correos corporativos</li>
          <li>✓ Sin tiempo mínimo de permanencia</li>
        </ul>
        <div class="plan-footer-box">
          <div class="plan-footer-label">Ideal para:</div>
          <div class="plan-footer-value">Empresas que buscan inversión única</div>
        </div>
      </div>

      <div class="plan popular">
        <div class="popular-tag">⭐ MÁS POPULAR</div>
        <div class="plan-header">
          <div>
            <h3>Plan Crecimiento Corp.</h3>
            <span class="plan-badge-small">Soporte continuo</span>
          </div>
          <div style="text-align: right;">
            <div class="price">$180.000</div>
            <div class="price-sub">+ $35.000/mes</div>
          </div>
        </div>
        <ul>
          <li>✓ Todo lo del Plan Compra, más:</li>
          <li>✓ Hosting y Dominio mientras dure el plan</li>
          <li>✓ Soporte técnico prioritario 24/7</li>
          <li>✓ 3 cambios menores al mes</li>
          <li>✓ Monitoreo y optimización mensual</li>
        </ul>
        <div class="plan-footer-box">
          <div class="plan-footer-label">Inversión total (6 meses):</div>
          <div class="plan-footer-value">$390.000</div>
        </div>
      </div>

      <div class="plan">
        <div class="plan-header">
          <div>
            <h3>Plan Emprende Corp.</h3>
            <span class="plan-badge-small">Inversión inicial $0</span>
          </div>
          <div style="text-align: right;">
            <div class="price">$0</div>
            <div class="price-sub">+ $39.990/mes</div>
          </div>
        </div>
        <ul>
          <li>✓ Todo lo del Plan Crecimiento, más:</li>
          <li>✓ Sin inversión inicial</li>
          <li>✓ Perfecto para PYMES</li>
          <li>✓ Facilita el crecimiento</li>
        </ul>
        <div class="plan-footer-box">
          <div class="plan-footer-label">Inversión total (12 meses):</div>
          <div class="plan-footer-value">$479.880</div>
        </div>
      </div>
    </div>

    <div class="section benefits-section">
      <h2>Beneficios para tu empresa</h2>
      <div class="benefits-grid">
        <div class="benefit-item">
          <div class="benefit-icon">🏢</div>
          <div class="benefit-title">Imagen Profesional</div>
          <div class="benefit-desc">Transmite confianza y seriedad</div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">📱</div>
          <div class="benefit-title">Multi-página</div>
          <div class="benefit-desc">Muestra todos tus servicios</div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">🔍</div>
          <div class="benefit-title">SEO Avanzado</div>
          <div class="benefit-desc">Mejor posicionamiento en Google</div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">⚙️</div>
          <div class="benefit-title">Panel de Control</div>
          <div class="benefit-desc">Administra tu contenido fácilmente</div>
        </div>
      </div>
    </div>

    <div class="cta-box">
      <h3>¿Listo para profesionalizar tu empresa?</h3>
      <p>Contáctanos hoy y obtén una presencia web que destaque</p>
    </div>
  `;
}
