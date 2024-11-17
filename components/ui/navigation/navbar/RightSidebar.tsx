import ROUTES from '@/constans/routes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Tags from '../../../../app/(root)/tags/page';
import TagCard from '@/components/cards/TagCard';

const hotQuestions = [
    { _id: "1", title:"How to create a custom hook in React?"},
    { _id: "2", title:"How to use React Query"},
    { _id: "3", title:"How to Redux?"},
    { _id: "4", title:"How to use React Router?"},
    { _id: "5", title:"How to use React Context?"},   
];

const popularTags = [
    {_id: "1", name: "React", questions: 100},
    {_id: "2", name: "JavaScript", questions: 230},
    {_id: "3", name: "HTML", questions: 500},
    {_id: "4", name: "CSS", questions: 50},
    {_id: "5", name: "Python", questions: 100},
]



const RightSidebar = () => {


  return (
    <section className='pt-36 custom-scrollbar background-light900_dark200 
    light-border sticky top-0 right-0 h-screen flex flex-col justify-between overflow-y-auto
     border-l p-6 w-[350px] max-sm:hidden dark:shadow-none'>
        <div>
            <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>

            <div className='mt-7 flex w-full flex-col gap-[30px]'>
              {hotQuestions.map(({_id, title}) => (
                  <Link
                  key={_id}
                  href={ROUTES.PROFILE(_id)}
                  className='flex cursor-pointer items-center justify-between
                  gap-7'>
                    <p className='body-medium text-dark500_light700'>{title}</p>
                    <Image 
                    src={"/icons/chevron-right.svg"}
                    width={20}
                    height={20}
                    alt='Chevron' className='inver-colors'/>
                  </Link> 
              )

              )}
            </div>
        </div>
        <div className='mt-16'>
              <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
              <div className='mt-7 flex flex-col gap-4'>
                {popularTags.map(({_id, name, questions}) => (
                    <TagCard 
                    key={_id}
                    _id={_id}
                     name={name} 
                     questions={questions}
                     showCount
                     compact />
                ))}
              </div>
        </div>
    </section>
  )
}

export default RightSidebar