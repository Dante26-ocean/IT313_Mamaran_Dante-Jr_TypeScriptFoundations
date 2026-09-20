import getStatus, { EnrollmentStatus, computeAverage } from './gradeUtils';

interface Enrolle {
    name: string;
    prelim: number;
    midterm: number;
    final: number;
}

interface EligibilityReport {
    name: string;
    average: number;
    status: EnrollmentStatus;
    remarks?: string;
}

type BatchId = string | number;

const enrollees: Enrolle[] = [
    { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
    { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
    { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
    { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
    { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 }
];

function getEnrollees(): Promise<Enrolle[]> {
    return new Promise((resolve) => 
        setTimeout(() => resolve(enrollees), 500)
    );
}

function groupBy<T>(
    items: T[],
    key: (item: T) => string
): Record<string, T[]> {
    return items.reduce((groups, item) => {
        const k = key(item);
        (groups[k] ??= []).push(item);
        return groups;
    }, {} as Record<string, T[]>);
}

async function main(): Promise<void> {
    try {
        const batchId: BatchId = "IT313-001";

        if (typeof batchId === "string") {
            console.log("Batch:", batchId);
        }

        const data = await getEnrollees();

        const reports: EligibilityReport[] = data.map((student) => {
            const average = computeAverage(
                student.prelim,
                student.midterm,
                student.final
            );

            const status = getStatus(average);

            return {
                name: student.name,
                average,
                status,
                ...(status === EnrollmentStatus.Probation
                    ? { remarks: "Needs consultation" }
                    : {})
            };
        });

        const groups = groupBy(reports, r => r.status);

        const classAverage =
            reports.reduce((Sum, r) => Sum + r.average, 0) / reports.length;

        console.log("\n=== IT313 Enrollment Eligibility Report (TypeScript) ===");

        reports.forEach((report) => 
            console.log(
                `${report.name} - Average: ${report.average.toFixed(2)} - ${report.status}` +
                `${report.remarks ? " - " + report.remarks : ""}`
            )
        );

        console.log(`Class Average: ${classAverage.toFixed(2)}`);
        console.log(`Passing: ${groups[EnrollmentStatus.Passing]?.length ?? 0} / ${reports.length}`);


    } catch (error) {
        console.error("Failed to retrieve enrolle records.");
    }
}

main();

