import { client, urlFor } from '@/lib/sanity'
import { newsQuery } from '@/lib/queries'
import Image from 'next/image'
import Link from 'next/link'

async function getNews() {
  const news = await client.fetch(newsQuery)
  return news
}

export default async function NewsPage() {
  const news = await getNews()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">News & Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item: any) => (
          <Link 
            href={`/news/${item.slug.current}`} 
            key={item._id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {item.mainImage && (
                <div className="relative h-48">
                  <Image
                    src={urlFor(item.mainImage).url()}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-indigo-600">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
