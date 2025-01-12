'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form'

import { AskQuestionSchema } from '@/lib/validations';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';

const QuestionForm = () => {

    const form = useForm({
        resolver: zodResolver(AskQuestionSchema),
        defaultValues: {
            title: '',
            content: '',
            tags: [],
    }}
);

const handleCreateQuestion = async () => {}

  return (
    <Form {...form}>
        <form className='flex w-full flex-col gap-10' onSubmit={form.handleSubmit(handleCreateQuestion)}>   
        <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className=" flex w-full flex-col gap-2.5">
                  <FormLabel className='paragraph-semibold text-dark400_light800'>Question title<span className='text-primary-500'>*</span></FormLabel>
                  <FormControl>
                    <Input
                    {...field}
                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700
                     no-focus min-h-[56px] border" />
                  </FormControl>
                  <FormDescription className='body-regular mt-2.5 text-light-500' >
                    Be specific and imagine you&apos;re asking a question to another person
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem className=" flex w-full flex-col gap-2.5">
                  <FormLabel className='paragraph-semibold text-dark400_light800'>Detail explantion of your problem<span className='text-primary-500'>*</span></FormLabel>
                  <FormControl>
                    
                  </FormControl>
                  <FormDescription className='body-regular mt-2.5 text-light-500' >
                    Be specific and imagine you&apos;re asking a question to another person
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tags'
              render={({ field }) => (
                <FormItem className=" flex w-full flex-col gap-2.5">
                  <FormLabel className='paragraph-semibold text-dark400_light800'>Question title<span className='text-primary-500'>*</span></FormLabel>
                  <FormControl>
                    <div>
                        <Input
                        {...field}
                        className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700
                         no-focus min-h-[56px] border" placeholder='Add tags...' />
                         Tags
                    </div>
                  </FormControl>
                  <FormDescription className='body-regular mt-2.5 text-light-500' >
                   Add up to 3 tags to describe what your question is about. You need press Enter to add a tag.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='mt-16 flex justify-end'>
                <Button type='submit'
                className='primary-gradient w-fit !text-light-900'>
                    Ask A Question
                </Button>

            </div>
        </form>
    </Form>
  )
}

export default QuestionForm