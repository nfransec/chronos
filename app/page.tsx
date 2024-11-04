"use client";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import '@/app/globals.css';
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { Button } from '@/components/ui/button'
import { addDays, format, startOfWeek } from 'date-fns'
import { ChevronDown, ChevronLeft, ChevronRight, Search, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMemo, useState } from "react";


Amplify.configure(outputs);

const client = generateClient<Schema>();

const kernelTeam = [
  { id: 1, name: 'Nirmal Francis', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 2, name: 'Vikram DG', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 3, name: 'Premkumar R', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 4, name: 'Raj Meghraj', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 5, name: 'Siddhesh Parab', avatar: '/placeholder.svg?height=32&width=32' },
]

const shifts = [
  { employeeId: 1, day: '2024-11-04', location: 'Remote', position: 'Senior Manager', startTime: '09:00', endTime: '17:00', color: 'bg-yellow-100' },
  { employeeId: 2, day: '2024-11-05', location: 'Hyderabad', position: 'LMTS', startTime: '08:00', endTime: '16:00', color: 'bg-blue-100' },
  { employeeId: 3, day: '2024-11-08', location: 'Bangalore', position: 'SMTS', startTime: '08:00', endTime: '16:00', color: 'bg-blue-100' },
  { employeeId: 4, day: '2024-11-09', location: 'Hyderbad', position: 'MTS', startTime: '09:00', endTime: '17:00', color: 'bg-orange-100' },
  { employeeId: 5, day: '2024-11-06', location: 'Hyderabad', position: 'AMTS', startTime: '08:00', endTime: '16:00', color: 'bg-green-100' },
]

export default function HomePage() {

  const [date, setDate] = useState(new Date('2024-11-04'))

  const weekDays = useMemo(() => {
    const start = startOfWeek(date, { weekStartsOn: 0 })
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }, [date])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-blue-600">Avila</h1>
            <nav className="flex items-center gap-4">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">Dashboard</Button>
              <Button variant="ghost" className="text-blue-600 border-b-2 border-blue-600">Schedule</Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">Leave</Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">Training</Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">Staff</Button>
            </nav>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <Settings className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>NF</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-700">Welcome, Nirmal</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-gray-200 px-4 py-2">
          <Select defaultValue="overview">
            <SelectTrigger className="w-[200px] bg-white border border-gray-300 text-gray-700">
              <SelectValue placeholder="Schedule overview" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Schedule overview</SelectItem>
              <SelectItem value="employee">Employee view</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="week">
            <SelectTrigger className="w-[100px] bg-white border border-gray-300 text-gray-700">
              <SelectValue placeholder="Week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="bg-white text-gray-700">Today</Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Input
              placeholder="Search..."
              className="w-[200px] bg-white border border-gray-300 text-gray-700"
              startIcon={<Search className="h-4 w-4 text-gray-500" />}
            />
            <Button variant="outline" className="bg-white text-gray-700">Tools</Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">Publish</Button>
          </div>
        </div>
      </header>

        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((day) => (
              <div key={day.toString()} className="space-y-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-700">
                    {format(day, 'EEE, MMM d')}
                  </div>
                </div>
                {kernelTeam.map((employee) => (
                  <div key={employee.id} className="min-h-[60px] relative">
                    {shifts
                      .filter(shift => shift.employeeId === employee.id && shift.day === format(day, 'yyyy-MM-dd'))
                      .map((shift, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 ${shift.color} p-2 rounded-md text-gray-800`}
                        >
                          <div className="text-xs font-medium">{shift.location}</div>
                          <div className="text-xs">{shift.position}</div>
                          <div className="text-xs">
                            {shift.startTime} - 
                            {shift.endTime}
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
