import React from 'react'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

const FormField = ({ id, label, register, error, type = 'text', autoComplete = 'off' }) => (
    <div className="flex flex-col w-full">
        <label htmlFor={id} className="sr-only">{label}</label>
        <Input
            id={id}
            type={type}
            placeholder={label}
            autoComplete={autoComplete}
            {...register(id)}
            className={cn(
                'border-gray-300 focus-visible:ring-green-600',
                error && 'border-red-500 focus-visible:ring-red-500'
            )}
            aria-invalid={!!error}
            aria-describedby={`${id}-error`}
        />
        {error && (
            <span id={`${id}-error`} className="text-red-500 text-xs mt-1">{error.message}</span>
        )}
    </div>
);

export default FormField