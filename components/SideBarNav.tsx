'use client'

import * as React from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { addMonths, format, subMonths } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ShiftRosterSidebar() {
  const [date, setDate] = React.useState<Date>(new Date('2024-11-04'))
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>(['Hyderabad'])
  
  const locations = ['Hyderabad', 'Bangalore', 'Remote']
  const roles = ['Duty Handler', 'Shift Lead', 'Dev Cohort']

  const handleMonthChange = (increment: boolean) => {
    setDate(current => increment ? addMonths(current, 1) : subMonths(current, 1))
  }

  const handleLocationToggle = (location: string) => {
    setSelectedLocations(current =>
      current.includes(location)
        ? current.filter(l => l !== location)
        : [...current, location]
    )
  }

  return (
    <Card className="w-[300px] p-4 space-y-6 bg-white border-none shadow-none">
      <Select defaultValue="overview">
        <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-700">
          <SelectValue placeholder="Schedule overview" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="overview">Schedule overview</SelectItem>
          <SelectItem value="detailed">Detailed view</SelectItem>
        </SelectContent>
      </Select>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Select value={format(date, 'MMMM, yyyy')}>
            <SelectTrigger className="w-[160px] bg-white border border-gray-300 text-gray-700">
              <SelectValue>{format(date, 'MMMM, yyyy')}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => {
                const d = new Date(2024, i)
                return (
                  <SelectItem key={i} value={format(d, 'MMMM, yyyy')}>
                    {format(d, 'MMMM, yyyy')}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleMonthChange(false)}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleMonthChange(true)}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          className="rounded-md border border-gray-300"
        />
      </div>

      <div className="space-y-4">
        <div className="text-sm font-medium text-gray-500 uppercase">Filters</div>
        
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between text-gray-700 hover:text-gray-900">
            <span className="text-sm font-bold">Locations</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {locations.map((location) => (
              <div key={location} className="flex items-center justify-between py-1">
                <span className="text-sm text-gray-700">{location}</span>
                <Checkbox
                  checked={selectedLocations.includes(location)}
                  onCheckedChange={() => handleLocationToggle(location)}
                  className="border-gray-300 text-blue-600"
                />
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className="flex w-full items-center justify-between text-gray-700 hover:text-gray-900">
            <span className="text-sm font-bold">Roles</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            {roles.map((role) => (
                <div key={role} className='flex items-center justify-between py-1'>
                    <span className='text-sm text-gray-700'>{role}</span>
                    <Checkbox
                        className='border-gray-300 text-blue-600'
                    />
                </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className="flex w-full items-center justify-between text-gray-700 hover:text-gray-900">
            <span className="text-sm font-bold">Something else</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            {/* Something else content */}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </Card>
  )
}