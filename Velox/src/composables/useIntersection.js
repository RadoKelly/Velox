import { ref, onMounted, onUnmounted } from 'vue'

export function useIntersection(options = {}) {
  const targetRef = ref(null)
  const inView    = ref(false)

  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        inView.value = true
        if (options.once !== false) observer.disconnect()
      }
    }, {
      threshold: options.threshold ?? 0.1,
      rootMargin: options.rootMargin ?? '0px',
    })

    if (targetRef.value) observer.observe(targetRef.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { targetRef, inView }
}