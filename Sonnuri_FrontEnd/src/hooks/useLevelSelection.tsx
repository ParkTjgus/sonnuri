// useLevelSelection.tsx

import { useState } from 'react'
import { levelType, type LevelType } from '../constants/levelConstants.tsx'

export const useLevelSelection = () => {
    const [selectLevel, setSelectLevel] = useState<LevelType | null>(levelType.Beginner)

    const select = (level: LevelType) => {
        setSelectLevel(level)
    }

    return {
        selectLevel,
        select,
    }
}
