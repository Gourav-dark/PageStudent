export interface subject{
    id:number
    s_Name:string,
    s_Code:string
}
export interface marks{
    obtainedMarks:number,
    studentId:string,
    subjectId:number,
    gradeId:number
}
export interface grade{
    id: number,
    min: number,
    max: number,
    grades: string
}