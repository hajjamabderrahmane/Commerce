import { useEffect, useRef } from 'react'

export function useScrollAnimation() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

export function useScrollAnimationGroup(count) {
  const refs = useRef([])

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('visible'), i * 100)
            observer.disconnect()
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      )
      observer.observe(el)
    })
  }, [count])

  const setRef = (i) => (el) => { refs.current[i] = el }
  return setRef
}
