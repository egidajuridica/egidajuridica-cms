'use client'

import { useEffect } from 'react'

export default function AntiTranslateScript() {
  useEffect(() => {
    const setupAntiTranslation = () => {
      document.documentElement.lang = 'es'
      document.documentElement.setAttribute('translate', 'no')
      document.documentElement.classList.add('notranslate')

      if (!document.querySelector('meta[name="google"][content="notranslate"]')) {
        const metaGoogle = document.createElement('meta')
        metaGoogle.name = 'google'
        metaGoogle.content = 'notranslate'
        document.head.appendChild(metaGoogle)
      }
    }

    const detectAndWarn = () => {
      const isTranslated =
        document.body.classList.contains('translated-ltr') ||
        document.body.classList.contains('translated-rtl') ||
        document.querySelector('iframe[src*="translate.googleapis.com"]') ||
        document.querySelector('.goog-te-banner-frame')

      if (isTranslated && !document.getElementById('translate-warning')) {
        const warning = document.createElement('div')
        warning.id = 'translate-warning'
        warning.innerHTML = `
          <div style="
            position: fixed; top: 0; left: 0; right: 0; z-index: 999999;
            background: linear-gradient(135deg, #ff4444, #cc0000);
            color: white; padding: 12px 20px; text-align: center;
            font-family: -apple-system, sans-serif; font-size: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          ">
            ⚠️ <strong>Google Translate detectado</strong><br>
            <small>Puede causar errores. Recarga sin traducir para mejor experiencia.</small>
            <button onclick="location.reload()" style="
              margin-left: 15px; background: white; color: #cc0000;
              border: none; padding: 6px 12px; border-radius: 4px;
              cursor: pointer; font-size: 12px; font-weight: 600;
            ">Recargar</button>
            <button onclick="this.parentElement.parentElement.remove()" style="
              margin-left: 8px; background: transparent; color: white;
              border: 1px solid rgba(255,255,255,0.5); padding: 6px 12px;
              border-radius: 4px; cursor: pointer; font-size: 12px;
            ">Cerrar</button>
          </div>
        `
        document.body.appendChild(warning)
      }
    }

    const observer = new MutationObserver(() => {
      setTimeout(detectAndWarn, 100)
    })

    setupAntiTranslation()
    detectAndWarn()

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
      document.getElementById('translate-warning')?.remove()
    }
  }, [])

  return null
}
