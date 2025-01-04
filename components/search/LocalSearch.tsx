'use client'

import Image from 'next/image'
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'


import { formUrlQuery, removeKeysFromQuery } from '@/lib/url';

import { Input } from '../ui/input'




interface Props {
    route : string;
    imgsrc : string;
    placeholder : string;
    otherClasses? : string
}

const LocalSearch = ({route, imgsrc, placeholder, otherClasses}: Props) => {

        const router = useRouter();
        const pathname = usePathname();

        const searchParams = useSearchParams();
        const query = searchParams.get('query') || '';

        const [searchQuery, setSearchQuery] = useState(query);

        useEffect(() => {

          const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
              const newUrl = formUrlQuery({
                key: 'query',
                value: searchQuery,
                params: searchParams.toString()
              })
              router.push(newUrl , {scroll: false})
            } else {
              if (pathname === route) {
                const newUrl = removeKeysFromQuery({
                  keysToRemove: ['query'],
                  params: searchParams.toString()
              });
              router.push(newUrl, {scroll: false})
              }
            }
          } , 1000);
          return () => clearTimeout(delayDebounceFn);
          
        }, [searchQuery, router, searchParams, route, pathname]);
        

     

  return (
    <div className={`background-light800_darkgradient flex min-h-[56px]
     grow items-center rounded-[10px] px-4 ${otherClasses}`}>
        <Image src={imgsrc} width={24} height={24} alt='Search' className='cursor-pointer' />
        <Input type='text'
         placeholder={placeholder} 
         value={searchQuery} 
         onChange={(e) => setSearchQuery(e.target.value)}  
         className='paragraph-regular no-focus placeholder text-dark400_light700 border-none
         shadow-none outline-none ' />
    </div>
  )
}

export default LocalSearch