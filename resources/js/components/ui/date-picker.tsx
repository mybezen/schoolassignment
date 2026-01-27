"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

interface DatePickerProps {
  id?: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  required?: boolean;
  className?: string;
}

export function DatePicker({
  id,
  date,
  setDate,
  onFocus,
  onBlur,
  required,
  className = ""
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <FieldGroup className="mx-auto max-w-xs flex-row">
      <Field>
        <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id={id}
              className={`w-full justify-between font-normal ${!date ? 'text-muted-foreground' : ''}`}
              type="button"
            >
              {date ? format(date, "PPP") : "Select date"}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate)
                setOpen(false)
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {required && !date && (
          <p className="mt-1 text-sm text-destructive">This field is required</p>
        )}
      </Field>
      <Field className="w-32">
        <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
        <Input
          type="time"
          id="time-picker-optional"
          step="1"
          defaultValue="10:30:00"
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>
  )
}
