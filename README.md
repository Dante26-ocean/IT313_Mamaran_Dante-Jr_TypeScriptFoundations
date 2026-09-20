This project is an Enrollment Eligibility Checker written in TypeScript.

The program receives enrollee records containing their prelim,
midterm, and final grades. It computes the average grade and determines
whether the enrollee is Passing or on Probation.

The purpose of converting the original JavaScript program to TypeScript
is to use static typing to detect type-related errors before the program
runs.

## TypeScript Concepts Used

### Basic Types

The program uses string and number types for names and grades.

### Interfaces

The `Enrollee` interface describes the structure of an enrollee.

The `EligibilityReport` interface describes the structure of the
generated eligibility report.

### Enum

The `EnrollmentStatus` enum limits the status to:

- Passing
- Probation

### Type Alias and Union Type

The `BatchId` type alias allows the batch ID to be either a string
or a number.

The program uses `typeof` to narrow the value before using it.

### Optional Property

The `remarks` property of `EligibilityReport` is optional because
only probation records need a remark.

### Generics

The `groupBy<T>()` function uses a generic type so it can work with
different types of arrays.

## Files

- `gradeUtils.ts` - contains grade calculation and status functions
- `main.ts` - contains the main program
- `tsconfig.json` - TypeScript configuration
- `README.md` - project documentation


## How to Run

Install TypeScript and ts-node if necessary:

```bash
npm install -D typescript ts-node



soo must the expected output will be:

Registrar Batch: IT313-BATCH-001

=== IT313 Enrollment Eligibility Report (TypeScript) ===
Ana Cruz - Average: 87.67 - PASSING
Bea Santos - Average: 65.00 - PROBATION - Needs consultation
Cid Ramos - Average: 94.67 - PASSING
Dex Alonzo - Average: 55.00 - PROBATION - Needs consultation
Eli Tan - Average: 78.00 - PASSING
Class Average: 76.07
Passing: 3 / 5