"use client"

import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

interface UseServiceCarouselOptions {
    autoplayDelay?: number
    stopOnInteraction?: boolean
    loop?: boolean
}

export function useServiceCarousel(options: UseServiceCarouselOptions = {}) {
    const {
        autoplayDelay = 4000,
        stopOnInteraction = false,
        loop = true
    } = options

    const [isPlaying, setIsPlaying] = useState(true)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop,
            align: 'start',
            skipSnaps: false,
            dragFree: false,
            containScroll: 'trimSnaps',
            slidesToScroll: 1,
            breakpoints: {
                '(min-width: 640px)': { slidesToScroll: 1 },
                '(min-width: 1024px)': { slidesToScroll: 1 }
            }
        },
        [Autoplay({
            delay: autoplayDelay,
            stopOnInteraction,
            stopOnMouseEnter: true,
            stopOnFocusIn: true,
            playOnInit: true
        })]
    )

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index)
    }, [emblaApi])

    const toggleAutoplay = useCallback(() => {
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay) return

        const playOrStop = isPlaying ? autoplay.stop : autoplay.play
        playOrStop()
        setIsPlaying(!isPlaying)
    }, [emblaApi, isPlaying])

    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => {
            setCurrentSlide(emblaApi.selectedScrollSnap())
            setCanScrollPrev(emblaApi.canScrollPrev())
            setCanScrollNext(emblaApi.canScrollNext())
        }

        const onPointerDown = () => {
            const autoplay = emblaApi.plugins()?.autoplay
            if (autoplay) autoplay.stop()
        }

        const onPointerUp = () => {
            const autoplay = emblaApi.plugins()?.autoplay
            if (autoplay && isPlaying) {
                setTimeout(() => autoplay.play(), 2000)
            }
        }

        emblaApi.on('select', onSelect)
        emblaApi.on('pointerDown', onPointerDown)
        emblaApi.on('pointerUp', onPointerUp)
        onSelect()

        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('pointerDown', onPointerDown)
            emblaApi.off('pointerUp', onPointerUp)
        }
    }, [emblaApi, isPlaying])

    return {
        emblaRef,
        emblaApi,
        currentSlide,
        isPlaying,
        canScrollPrev,
        canScrollNext,
        scrollPrev,
        scrollNext,
        scrollTo,
        toggleAutoplay
    }
}