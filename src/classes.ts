abstract class Department {
  static fiscalYear = 2023;
  // private id: string;
  //   private name: string;
  //only methods within the class can affect the "private" employees, "readonly" will stop it from being changed.
  //protected are only accessible to the instantiated class and also inherited classes
  protected employees: string[] = [];
  constructor(protected readonly id: string, public name: string) {
    // this.name = n;
    // this.id= id;
  }
  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(this: Department): void;
  // console.log(`Department (${this.id}) : ${this.name}`);

  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
  describe() {
    console.log("IT Department - ID: " + this.id);
  }
}

class BusinessDepartment extends Department {
  private lastReport: string;
  private static instance: BusinessDepartment;
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error(" No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value");
    } else {
      this.addReport(value);
    }
  }
  private constructor(id: string, private reports: string[]) {
    super(id, "Business");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (BusinessDepartment.instance) {
      return this.instance;
    }
    this.instance = new BusinessDepartment("d2", []);
    return this.instance;
  }

  describe() {
    console.log("Accounting Department - ID: " + this.id);
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment("d1", ["Felix"]);
it.addEmployee("Felix Willem");
it.addEmployee("Jillian");
it.printEmployeeInformation();
console.log(it);
it.describe();

// const business = new BusinessDepartment("d2", []);
const business = BusinessDepartment.getInstance();
const business2 = BusinessDepartment.getInstance();
console.log(business, business2);

business.mostRecentReport = "Year end report";
business.addReport("Something went wrong...");
console.log(business.mostRecentReport);

business.addEmployee("Max");
business.addEmployee("Manu");
business.describe();
// business.printReports();
// business.printEmployeeInformation;
// console.log(business);
// const businessCopy = { name: "DUMMY", describe: business.describe };
// businessCopy.describe();
