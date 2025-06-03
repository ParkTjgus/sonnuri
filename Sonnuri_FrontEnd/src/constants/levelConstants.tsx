import type { ReactNode } from 'react'
import { FaBook } from 'react-icons/fa'

export const levelType = {
    Beginner: 'Beginner',
    Intermediate: 'Intermediate',
    Advanced: 'Advanced',
} as const

export const iconMap: Record<LevelType, ReactNode> = {
    Beginner: <FaBook />,
    Intermediate: <FaBook />,
    Advanced: <FaBook />,
}

// 레벨 타입 정의
export type LevelType = (typeof levelType)[keyof typeof levelType]


export const baseColorMap: Record<LevelType, string> = {
    Beginner: '#DBEAFE',
    Intermediate: '#D1FAE5',
    Advanced: '#EDE9FE',
}

export const pointColorMap: Record<LevelType, string> = {
    Beginner: '#3B82F6',
    Intermediate: '#10B981',
    Advanced: '#8B5CF6',
}