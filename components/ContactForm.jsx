'use client';

import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';
import { BorderBeam } from './magicui/border-beam';
import { ArrowRight, Loader2 } from 'lucide-react';
import FormField from './FormField';

// ✅ Schema defined once outside to avoid recomputing on render
const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

const resolver = zodResolver(contactSchema);

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver,
  });

  // ✅ Memoized for performance
  const onSubmit = useCallback(async (data) => {
    try {
      console.log('Form submitted:', data);
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
      reset();
    } catch (error) {
      console.error('Submission failed:', error);
    }
  }, [reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-4xl mx-auto p-6 bg-white justify-center items-center rounded-lg shadow-md md:mt-8 mt-4 relative border"
      noValidate
      aria-label="Contact Form"
    >
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 text-center mb-2">Contact Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <FormField
          id="name"
          label="Name"
          register={register}
          error={errors.name}
          type="text"
          autoComplete="name"
        />
        <FormField
          id="email"
          label="Email"
          register={register}
          error={errors.email}
          type="email"
          autoComplete="email"
        />
      </div>

      <FormField
        id="subject"
        label="Subject"
        register={register}
        error={errors.subject}
        type="text"
        autoComplete="off"
      />

      <div className="flex flex-col w-full">
        <Textarea
          id="message"
          placeholder="Message"
          {...register('message')}
          className={cn(
            'border border-gray-300 rounded-md px-3 py-2 focus-visible:ring-green-600 resize-none',
            errors.message && 'border-red-500 focus-visible:ring-red-500'
          )}
          aria-invalid={!!errors.message}
          aria-describedby="message-error"
        />
        {errors.message && (
          <span id="message-error" className="text-red-500 text-xs mt-1">{errors.message.message}</span>
        )}
      </div>

      <Button
        variant="default"
        type="submit"
        disabled={isSubmitting}
        className="group w-full md:w-auto mt-2 bg-white text-black border border-black hover:bg-black hover:text-white transition-colors duration-200 p-3 text-lg font-semibold flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            Sending... <Loader2 className="ml-2 h-5 w-5 animate-spin" />
          </>
        ) : (
          <>
            Send <ArrowRight className="ml-2 h-5 w-5 opacity-80 translate-x-0 group-hover:translate-x-1 group-hover:text-green-500 group-hover:opacity-100 transition-all duration-200" />
          </>
        )}
      </Button>

      {isSubmitSuccessful && (
        <span className="text-green-600 text-sm mt-2">Message sent successfully!</span>
      )}

      <BorderBeam
        duration={20}
        className="from-green-700 via-green-500 to-transparent absolute"
      />
    </form>
  );
};

export default ContactForm;
