'use client'

import { useEffect } from 'react'

export default function CopyCodeBlock() {
  useEffect(() => {
    const blocks = document.querySelectorAll('.prose pre')

    blocks.forEach((block) => {
      if (block.querySelector('.copy-btn')) return

      const btn = document.createElement('button')
      btn.className = 'copy-btn'
      btn.setAttribute('aria-label', 'Copy code')
      btn.textContent = 'Copy'

      btn.addEventListener('click', async () => {
        const code = block.querySelector('code')?.innerText ?? block.innerText
        try {
          await navigator.clipboard.writeText(code)
          btn.textContent = 'Copied!'
          btn.classList.add('copy-btn--copied')
          setTimeout(() => {
            btn.textContent = 'Copy'
            btn.classList.remove('copy-btn--copied')
          }, 2000)
        } catch {
          btn.textContent = 'Error'
          setTimeout(() => { btn.textContent = 'Copy' }, 2000)
        }
      })

      block.appendChild(btn)
    })
  }, [])

  return null
}
