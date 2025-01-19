"use client"

import * as React from "react"
import { Slider } from "./slider"

type SliderProps = React.ComponentPropsWithoutRef<typeof Slider> & {
  label?: string
}

const CarouselSlider = React.forwardRef<
  React.ElementRef<typeof Slider>,
  SliderProps
>(({ label, ...props }, ref) => {
  return (
    <div className="w-full max-w-md">
      {label && <p className="mb-2 text-sm text-muted-foreground">{label}</p>}
      <Slider ref={ref} {...props} />
    </div>
  )
})
CarouselSlider.displayName = "CarouselSlider"

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={`relative w-full ${className}`} {...props}>
    {children}
  </div>
))
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={`flex ${className}`} {...props}>
    {children}
  </div>
))
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={`flex-0 flex-grow-0 flex-shrink-0 w-full ${className}`} {...props}>
    {children}
  </div>
))
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${className}`}
    {...props}
  >
    Previous
  </button>
))
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${className}`}
    {...props}
  >
    Next
  </button>
))
CarouselNext.displayName = "CarouselNext"

export { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext, 
  CarouselSlider 
}
