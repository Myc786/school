import React from 'react';
import Image from 'next/image';
import { client, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { Slider } from '@/components/ui/slider';

// Define the type for Sports Week content
interface SportsWeekContent {
  _id?: string;
  title?: string;
  description?: any[];
  headerImages?: Array<{
    asset: {
      _ref: string;
    };
    alt?: string;
  }>;
  events?: {
    _key: string;
    name: string;
    date: string;
    description: string;
  }[];
}

// Fetch Sports Week content from Sanity
async function getSportsWeekContent() {
  const query = `*[_type == "sportsWeek"][0]{
    _id,
    title,
    description,
    headerImages[]{
      asset,
      alt
    },
    events[]{
      name,
      date,
      description
    }
  }`;

  try {
    const content = await client.fetch<SportsWeekContent | null>(query);
    return content || {};
  } catch (error) {
    console.error('Error fetching Sports Week content:', error);
    return {};
  }
}

export default async function SportsWeekPage() {
  const sportsWeekContent = await getSportsWeekContent();

  // Default content if no Sanity content is found
  const defaultContent = {
    title: 'Annual Sports Week',
    description: [
      {
        _type: 'block',
        children: [{
          _type: 'span',
          text: 'Get ready for an exciting week of sports, competition, and school spirit!'
        }]
      }
    ],
    headerImages: [
      {
        asset: {
          _ref: 'default-sports-image-1'
        },
        alt: 'Sports Week Default Image 1'
      },
      {
        asset: {
          _ref: 'default-sports-image-2'
        },
        alt: 'Sports Week Default Image 2'
      }
    ],
    events: [
      {
        _key: '1',
        name: 'Inter-School Football Tournament',
        date: 'TBA',
        description: 'Exciting football matches between schools'
      },
      {
        _key: '2',
        name: 'Basketball Championship',
        date: 'TBA',
        description: 'Showcase your basketball skills'
      }
    ]
  };

  // Merge default content with fetched content
  const content = { ...defaultContent, ...sportsWeekContent };

  // Ensure we have at least one image
  const headerImages = content.headerImages?.length 
    ? content.headerImages 
    : [{ asset: { _ref: 'default-sports-image' }, alt: 'Sports Week Default' }];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section with Slider */}
      <div className="mb-12 relative">
        <div className="w-full h-[400px] relative mb-6 rounded-xl overflow-hidden shadow-lg group">
          {/* Image Slider */}
          <div className="absolute inset-0 z-10">
            {headerImages.map((image, index) => (
              <div 
                key={index} 
                className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                style={{ 
                  opacity: index === 0 ? 1 : 0,
                  zIndex: index === 0 ? 10 : 0 
                }}
              >
                <Image 
                  src={image.asset?._ref && image.asset._ref !== 'default-sports-image-1'
                    ? urlFor(image.asset).url()
                    : `/images/sports-week-default-${index + 1}.jpg`} 
                  alt={image.alt || "Sports Week Image"}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>

          {/* Slider Control */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-1/2">
            <Slider 
              defaultValue={[0]} 
              max={headerImages.length - 1} 
              step={1}
              onValueChange={(values) => {
                // Hide all images
                const imageContainers = document.querySelectorAll('.absolute.inset-0');
                imageContainers.forEach((container, index) => {
                  container.setAttribute('style', 'opacity: 0; z-index: 0;');
                });

                // Show selected image
                const selectedContainer = imageContainers[values[0]];
                selectedContainer.setAttribute('style', 'opacity: 1; z-index: 10;');
              }}
            />
          </div>

          {/* Overlay Title */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
            <h1 className="text-4xl font-bold text-white text-center drop-shadow-lg">
              {content.title || "Annual Sports Week"}
            </h1>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="prose lg:prose-xl mb-12 text-gray-700">
        {content.description && (
          <PortableText value={content.description} />
        )}
      </section>

      {/* Events Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b-2 border-primary pb-3">
          Upcoming Events
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {content.events?.map((event) => (
            <div 
              key={event._key} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold mb-2 text-primary">
                {event.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Date:</strong> {event.date}
              </p>
              <p className="text-gray-700">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gray-100 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Join the Excitement!
        </h2>
        <p className="mb-6 text-gray-600">
          Don't miss out on the most anticipated sporting event of the year.
        </p>
        <button className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors">
          View Full Schedule
        </button>
      </section>
    </div>
  );
}
