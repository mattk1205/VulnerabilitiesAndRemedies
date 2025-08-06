import type {Level} from "./types.ts";

export function getLevels(): Level[] {
    return levelsInfo;
}

export const levelsInfo: Level[] = [
    {number: 1, description: "Low 1" , available: true},
    {number: 2, description: "Low 2 ", available: true},
    {number: 3, description: "Low 3 ", available: true},
    {number: 4, description: "Medium 5", available: true},
    {number: 5, description: "Medium 5", available: true},
    {number: 6, description: "Medium 6", available: true},
    {number: 7, description: "Medium 7", available: true},
    {number: 8, description: "Hard 8", available: true},
    {number: 9, description: "Hard 9", available: true},
    {number: 10, description: "Hard 10", available: false},
]