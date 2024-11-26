"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import NavigationHeader from "@/components/ui/NavigationHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { UploadDialog } from "@/components/Upload";

export default function Home() {
  const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent, wordIndex: number) => {
    const element = e.target as HTMLElement;
    const { left, right, top, bottom } = element.getBoundingClientRect();
    const withinX = e.clientX >= left - 10 && e.clientX <= right + 10;
    const withinY = e.clientY >= top - 10 && e.clientY <= bottom + 10;

    if (withinX && withinY) {
      setHoveredWordIndex(wordIndex);
    } else {
      setHoveredWordIndex(null);
    }
  };

  const textParagraphs = [
    "The National Museum of China, located in Beijing, is one of the largest museums in the world and a cultural treasure trove of Chinese history and art.",
    "The museum features a vast collection of over 1 million artifacts, spanning thousands of years of Chinese history, including jade carvings, bronze ware, ceramics, and calligraphy.",
    "It offers visitors an unparalleled journey through China's rich cultural heritage, showcasing masterpieces such as the Simuwu Ding, a Shang Dynasty bronze vessel, and exquisite Tang Dynasty pottery.",
  ];

  return (
    <div className="flex flex-col items-center">
      <NavigationHeader />
      {/* Side-by-Side Layout */}
      <div className="flex flex-wrap justify-center items-start w-full mt-8 gap-20">
        {/* Descriptions Section */}
        <div className="flex-1 max-w-md">
          <Card className="w-full shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Welcome to the National Museum of China
              </CardTitle>
              <CardDescription className="text-center text-gray-500">
                Beijing, China
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-justify">
              {textParagraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>
                  {paragraph.split(" ").map((word, wordIndex) => (
                    <span
                      key={wordIndex}
                      onMouseMove={(e) =>
                        handleMouseMove(e, wordIndex + paragraphIndex * 100)
                      }
                      style={{
                        color:
                          hoveredWordIndex === wordIndex + paragraphIndex * 100
                            ? "orange"
                            : "inherit",
                        transition: "color 0.3s",
                      }}
                    >
                      {word}{" "}
                    </span>
                  ))}
                </p>
              ))}
            </CardContent>
            <CardFooter className="flex justify-center">
              <a
                href="http://en.chnmuseum.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                Learn More
              </a>
            </CardFooter>
          </Card>
        </div>

        {/* Carousel Section */}
        <div className="flex-1 max-w-lg relative">
          <Carousel className="w-full">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                          <img src={`/images/chnm${index + 1}.jpeg`} alt={`Chinese National Museum Image ${index + 1}`} className="w-full h-full object-cover" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Adjust positioning to ensure arrows don't overlap */}
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
              <CarouselPrevious />
            </div>
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
              <CarouselNext />
            </div>
          </Carousel>
          <div className="mt-5">
            <UploadDialog location="Beijing" />
          </div>
        </div>
      </div>
    </div>
  );
}
