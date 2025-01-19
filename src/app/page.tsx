import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { client } from '@/lib/sanity-client'
import { sliderImagesQuery } from '@/lib/sanity-queries'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { motion } from 'framer-motion'
import { images } from '@/components/ImageConfig'
import HomeClient from './HomeClient'

interface SliderImage {
  title: string;
  description: string;
  imageUrl: string;
}

async function SliderComponent() {
  const sliderImages: SliderImage[] = await client.fetch(sliderImagesQuery)

  return (
    <Carousel className="w-full max-w-4xl mx-auto my-8">
      <CarouselContent>
        {sliderImages.map((image, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-video items-center justify-center p-0">
                <Image 
                  src={image.imageUrl} 
                  alt={image.title} 
                  width={1200} 
                  height={600} 
                  className="object-cover w-full h-full"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<div>Loading slider...</div>}>
        <SliderComponent />
      </Suspense>

      <HomeClient 
        campusHeroImage={images.campusHero} 
        isAuthenticated={!!session} 
      />
    </main>
  )
}