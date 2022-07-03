export type LectureModel = {
    readonly _id?: string
    lectureName: string;
    credit: number;
    department: object;
    remarks?: string;
};
export type DepartmentModel = {
    readonly _id?: string;
    departmentName: string;
    lectures?: LectureModel[];
    remarks?: string;
};
export type StudentModel = {
    readonly _id?: string;
    name: string;
    lectures?: LectureModel[];
    gpa: number;
    remarks?: string;
};
