
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Department {
    ADMIN = "ADMIN",
    COLLECTOR = "COLLECTOR",
    LAQ = "LAQ",
    LDCSINGLEWINDOW = "LDCSINGLEWINDOW",
    LRO = "LRO",
    MAMLATDAR = "MAMLATDAR",
    PATELTALATHI = "PATELTALATHI",
    PDA = "PDA",
    RDC = "RDC",
    SUPERINTENDENT_COLLECTORATE = "SUPERINTENDENT_COLLECTORATE",
    SYSTEM = "SYSTEM",
    USER = "USER"
}

export enum DepartmentStatus {
    ALLOT_HEARING = "ALLOT_HEARING",
    APPLY_SANAD = "APPLY_SANAD",
    FEES_PAID = "FEES_PAID",
    HEARING = "HEARING",
    HEARING_SCHEDULED = "HEARING_SCHEDULED",
    INTIMATION_DRAFT = "INTIMATION_DRAFT",
    NOTING_DRAFT = "NOTING_DRAFT",
    ORDER_DOWNLOAD = "ORDER_DOWNLOAD",
    ORDER_GENERATE = "ORDER_GENERATE",
    PAY_FEES = "PAY_FEES",
    REPORT_VERIFIED = "REPORT_VERIFIED",
    SEEK_REPORT = "SEEK_REPORT",
    SUBMIT = "SUBMIT"
}

export enum FeesStatus {
    ACTIVE = "ACTIVE",
    DUE = "DUE",
    INACTIVE = "INACTIVE",
    PAID = "PAID"
}

export enum FormStatus {
    APPROVED = "APPROVED",
    DRAFT = "DRAFT",
    INPROGRESS = "INPROGRESS",
    REJECTED = "REJECTED",
    SUBMITTED = "SUBMITTED"
}

export enum PaymentMode {
    CASH = "CASH",
    CHALLAN = "CHALLAN",
    DD = "DD",
    ONLINE = "ONLINE",
    OTHER = "OTHER"
}

export enum PaymentType {
    FEES = "FEES",
    OTHER = "OTHER",
    PENALTY = "PENALTY",
    REFUND = "REFUND",
    SANAD = "SANAD"
}

export enum QueryStatus {
    CLOSED = "CLOSED",
    PENDING = "PENDING",
    REPLIED = "REPLIED"
}

export enum QueryType {
    CORESPONDENCE = "CORESPONDENCE",
    HEARING_SCHEDULED = "HEARING_SCHEDULED",
    JIMNI = "JIMNI",
    NOTING = "NOTING",
    PRENOTE = "PRENOTE",
    QUERY = "QUERY",
    REPORT = "REPORT",
    RESCHEDULED = "RESCHEDULED",
    SANAD = "SANAD",
    SUBMITREPORT = "SUBMITREPORT",
    SUBMITREPORTEDITOR = "SUBMITREPORTEDITOR",
    UPDATES = "UPDATES"
}

export enum RequestType {
    APPLTODEPT = "APPLTODEPT",
    DEPTTOAPPL = "DEPTTOAPPL",
    DEPTTODEPT = "DEPTTODEPT"
}

export enum Role {
    ADMIN = "ADMIN",
    CIRCLEOFFICER = "CIRCLEOFFICER",
    COLLECTOR = "COLLECTOR",
    DEPUTYCOLLECTOR = "DEPUTYCOLLECTOR",
    DNHPDA = "DNHPDA",
    LAQ = "LAQ",
    LDCMAMLATDAR = "LDCMAMLATDAR",
    LDCSINGLEWINDOW = "LDCSINGLEWINDOW",
    LRO = "LRO",
    MAMLATDAR = "MAMLATDAR",
    PATOCOLLECTOR = "PATOCOLLECTOR",
    RAK = "RAK",
    RTSMAMLATDAR = "RTSMAMLATDAR",
    SNSSO = "SNSSO",
    SUPTDCOLL = "SUPTDCOLL",
    SURVEYOR = "SURVEYOR",
    SURVEYSETTLEMENT = "SURVEYSETTLEMENT",
    SYSTEM = "SYSTEM",
    TALATHI = "TALATHI",
    USER = "USER"
}

export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED",
    INACTIVE = "INACTIVE"
}

export interface CreateAuthInput {
    contact: string;
    firstName: string;
    lastName: string;
    password: string;
    role?: Nullable<Role>;
}

export interface CreateDashboardInput {
    exampleField: number;
}

export interface CreateNaApplicantInput {
    contact?: Nullable<string>;
    firstName: string;
    lastName: string;
    relation?: Nullable<string>;
    signature_url?: Nullable<string>;
}

export interface CreateNaFeeInput {
    amount: string;
    createdById: number;
    na_formId: number;
    purpose?: Nullable<string>;
}

export interface CreateNaInput {
    anx1?: Nullable<string>;
    anx2?: Nullable<string>;
    anx3?: Nullable<string>;
    anx4?: Nullable<string>;
    anx5?: Nullable<string>;
    applicants?: Nullable<CreateNaApplicantInput[]>;
    createdById: number;
    last_name?: Nullable<string>;
    q1: boolean;
    q2?: Nullable<string>;
    q3?: Nullable<string>;
    q4?: Nullable<string>;
    q5?: Nullable<string>;
    q6?: Nullable<string>;
    q7?: Nullable<string>;
    q8?: Nullable<string>;
    q9?: Nullable<string>;
    q10?: Nullable<string>;
    q11?: Nullable<string>;
    q12?: Nullable<string>;
    q13?: Nullable<string>;
    q14?: Nullable<string>;
    q15?: Nullable<string>;
    q16?: Nullable<string>;
    q17?: Nullable<string>;
    q18?: Nullable<string>;
    surveys?: Nullable<CreateNaSurveyInput[]>;
    villageId: number;
}

export interface CreateNaQueryInput {
    allot_hearing?: Nullable<boolean>;
    apply_sanad?: Nullable<boolean>;
    createdById: number;
    dept_update?: Nullable<boolean>;
    from_userId: number;
    hearing?: Nullable<boolean>;
    hearing_schedule?: Nullable<boolean>;
    intimation_draft?: Nullable<boolean>;
    na_formId: number;
    noting_draft?: Nullable<boolean>;
    query: string;
    query_status: QueryStatus;
    request_type: RequestType;
    seek_report?: Nullable<boolean>;
    submit_report?: Nullable<boolean>;
    to_userId: number;
    type: QueryType;
    upload_url_1?: Nullable<string>;
    upload_url_2?: Nullable<string>;
    upload_url_3?: Nullable<string>;
    upload_url_4?: Nullable<string>;
    upload_url_5?: Nullable<string>;
}

export interface CreateNaSurveyInput {
    area: string;
    sub_division: string;
    survey_no?: Nullable<string>;
}

export interface CreateNaUploadInput {
    exampleField: number;
}

export interface LoginAuthInput {
    contact: string;
    password: string;
}

export interface UpdateDashboardInput {
    exampleField?: Nullable<number>;
    id: number;
}

export interface UpdateNaApplicantInput {
    contact?: Nullable<string>;
    firstName?: Nullable<string>;
    id: number;
    lastName?: Nullable<string>;
    relation?: Nullable<string>;
    signature_url?: Nullable<string>;
}

export interface UpdateNaFeeInput {
    amount?: Nullable<string>;
    bank_name?: Nullable<string>;
    bank_ref_no?: Nullable<string>;
    createdById?: Nullable<number>;
    deletedById?: Nullable<number>;
    id: number;
    invoice_no?: Nullable<string>;
    is_paid?: Nullable<boolean>;
    na_formId?: Nullable<number>;
    order_id?: Nullable<string>;
    payment_mode?: Nullable<PaymentMode>;
    payment_type?: Nullable<PaymentType>;
    purpose?: Nullable<string>;
    status?: Nullable<FeesStatus>;
    track_id?: Nullable<string>;
    transaction_date?: Nullable<DateTime>;
    transaction_id?: Nullable<string>;
    updatedById?: Nullable<number>;
}

export interface UpdateNaInput {
    anx1?: Nullable<string>;
    anx2?: Nullable<string>;
    anx3?: Nullable<string>;
    anx4?: Nullable<string>;
    anx5?: Nullable<string>;
    applicants?: Nullable<CreateNaApplicantInput[]>;
    createdById?: Nullable<number>;
    deletedById?: Nullable<number>;
    dept_status?: Nullable<DepartmentStatus>;
    id: number;
    last_name?: Nullable<string>;
    q1?: Nullable<boolean>;
    q2?: Nullable<string>;
    q3?: Nullable<string>;
    q4?: Nullable<string>;
    q5?: Nullable<string>;
    q6?: Nullable<string>;
    q7?: Nullable<string>;
    q8?: Nullable<string>;
    q9?: Nullable<string>;
    q10?: Nullable<string>;
    q11?: Nullable<string>;
    q12?: Nullable<string>;
    q13?: Nullable<string>;
    q14?: Nullable<string>;
    q15?: Nullable<string>;
    q16?: Nullable<string>;
    q17?: Nullable<string>;
    q18?: Nullable<string>;
    status?: Nullable<Status>;
    surveys?: Nullable<CreateNaSurveyInput[]>;
    updatedById?: Nullable<number>;
    villageId?: Nullable<number>;
}

export interface UpdateNaSurveyInput {
    area?: Nullable<string>;
    id: number;
    sub_division?: Nullable<string>;
    survey_no?: Nullable<string>;
}

export interface UpdateNaUploadInput {
    exampleField?: Nullable<number>;
    id: number;
}

export interface Dashboard {
    exampleField: number;
}

export interface IMutation {
    approveReport(naid: number): Na | Promise<Na>;
    createDashboard(createDashboardInput: CreateDashboardInput): Dashboard | Promise<Dashboard>;
    createNa(createNaInput: CreateNaInput): Na | Promise<Na>;
    createNaApplicant(createNaApplicantInput: CreateNaApplicantInput): NaApplicant | Promise<NaApplicant>;
    createNaFee(createNaFeeInput: CreateNaFeeInput): NaFee | Promise<NaFee>;
    createNaQuery(createNaQueryInput: CreateNaQueryInput): NaQuery | Promise<NaQuery>;
    createNaSurvey(createNaSurveyInput: CreateNaSurveyInput): NaSurvey | Promise<NaSurvey>;
    createNaUpload(createNaUploadInput: CreateNaUploadInput): NaUpload | Promise<NaUpload>;
    hearingReScheduleNaQuery(createNaQueryInput: CreateNaQueryInput): NaQuery | Promise<NaQuery>;
    hearingScheduleNaQuery(createNaQueryInput: CreateNaQueryInput): NaQuery | Promise<NaQuery>;
    payNaFee(updateNaFeeInput: UpdateNaFeeInput): NaFee | Promise<NaFee>;
    registerUser(createAuthInput: CreateAuthInput): User | Promise<User>;
    removeDashboard(id: number): Dashboard | Promise<Dashboard>;
    removeNaApplicant(id: number): NaApplicant | Promise<NaApplicant>;
    removeNaSurvey(id: number): NaSurvey | Promise<NaSurvey>;
    removeNaUpload(id: number): NaUpload | Promise<NaUpload>;
    submitNaById(id: number): Na | Promise<Na>;
    submitNaQuery(createNaQueryInput: CreateNaQueryInput, id: number): NaQuery | Promise<NaQuery>;
    submitSeekReport(naid: number, userid: number): Na | Promise<Na>;
    updateDashboard(updateDashboardInput: UpdateDashboardInput): Dashboard | Promise<Dashboard>;
    updateNa(updateNaInput: UpdateNaInput): Na | Promise<Na>;
    updateNaApplicant(updateNaApplicantInput: UpdateNaApplicantInput): NaApplicant | Promise<NaApplicant>;
    updateNaSurvey(updateNaSurveyInput: UpdateNaSurveyInput): NaSurvey | Promise<NaSurvey>;
    updateNaUpload(updateNaUploadInput: UpdateNaUploadInput): NaUpload | Promise<NaUpload>;
}

export interface Na {
    anx1?: Nullable<string>;
    anx2?: Nullable<string>;
    anx3?: Nullable<string>;
    anx4?: Nullable<string>;
    anx5?: Nullable<string>;
    createdAt: DateTime;
    createdBy?: Nullable<User>;
    createdById?: Nullable<number>;
    deletedAt?: Nullable<DateTime>;
    deletedBy?: Nullable<User>;
    deletedById?: Nullable<number>;
    dept_status?: Nullable<DepartmentStatus>;
    dept_user?: Nullable<User>;
    dept_user_id?: Nullable<number>;
    form_status?: Nullable<FormStatus>;
    id: number;
    last_name?: Nullable<string>;
    na_applicant?: Nullable<NaApplicant[]>;
    na_survey?: Nullable<NaSurvey[]>;
    office_status?: Nullable<Department>;
    q1: boolean;
    q2?: Nullable<string>;
    q3?: Nullable<string>;
    q4?: Nullable<string>;
    q5?: Nullable<string>;
    q6?: Nullable<string>;
    q7?: Nullable<string>;
    q8?: Nullable<string>;
    q9?: Nullable<string>;
    q10?: Nullable<string>;
    q11?: Nullable<string>;
    q12?: Nullable<string>;
    q13?: Nullable<string>;
    q14?: Nullable<string>;
    q15?: Nullable<string>;
    q16?: Nullable<string>;
    q17?: Nullable<string>;
    q18?: Nullable<string>;
    seek_report: boolean;
    status: Status;
    updatedAt: DateTime;
    updatedBy?: Nullable<User>;
    updatedById?: Nullable<number>;
    village?: Nullable<Village>;
    villageId?: Nullable<number>;
}

export interface NaApplicant {
    aadhar?: Nullable<string>;
    address?: Nullable<string>;
    contact?: Nullable<string>;
    createdAt: string;
    deletedAt?: Nullable<string>;
    email?: Nullable<string>;
    firstName: string;
    id: number;
    is_main: boolean;
    lastName: string;
    na_form: Na;
    na_formId: number;
    relation?: Nullable<string>;
    signature_url?: Nullable<string>;
    status: UserStatus;
    updatedAt: string;
    village?: Nullable<Village>;
    villageId?: Nullable<number>;
}

export interface NaFee {
    amount: string;
    bank_name?: Nullable<string>;
    bank_ref_no?: Nullable<string>;
    createdAt: DateTime;
    createdBy?: Nullable<User>;
    createdById?: Nullable<number>;
    deletedAt?: Nullable<DateTime>;
    deletedBy?: Nullable<User>;
    deletedById?: Nullable<number>;
    id: number;
    invoice_no?: Nullable<string>;
    is_paid: boolean;
    na_form: Na;
    na_formId: number;
    order_id?: Nullable<string>;
    payment_mode: PaymentMode;
    payment_type: PaymentType;
    purpose?: Nullable<string>;
    status: FeesStatus;
    track_id?: Nullable<string>;
    transaction_date?: Nullable<DateTime>;
    transaction_id?: Nullable<string>;
    updatedAt: DateTime;
    updatedBy?: Nullable<User>;
    updatedById?: Nullable<number>;
}

export interface NaPagination {
    data: Na[];
    skip: number;
    take: number;
    total: number;
}

export interface NaQuery {
    createdAt: DateTime;
    createdBy?: Nullable<User>;
    createdById?: Nullable<number>;
    deletedAt?: Nullable<DateTime>;
    deletedBy?: Nullable<User>;
    deletedById?: Nullable<number>;
    from_user: User;
    from_userId: number;
    id: number;
    na_form: Na;
    na_formId: number;
    query: string;
    query_status: QueryStatus;
    request_type: RequestType;
    status: Status;
    to_user: User;
    to_userId: number;
    type: QueryType;
    updatedAt: DateTime;
    updatedBy?: Nullable<User>;
    updatedById?: Nullable<number>;
    upload_url_1?: Nullable<string>;
    upload_url_2?: Nullable<string>;
    upload_url_3?: Nullable<string>;
    upload_url_4?: Nullable<string>;
    upload_url_5?: Nullable<string>;
}

export interface NaSurvey {
    area?: Nullable<string>;
    createdAt: DateTime;
    createdBy?: Nullable<User>;
    createdById?: Nullable<number>;
    deletedAt?: Nullable<DateTime>;
    deletedBy?: Nullable<User>;
    deletedById?: Nullable<number>;
    id: number;
    na_form: Na;
    na_formId: number;
    status: Status;
    sub_division?: Nullable<string>;
    survey_no?: Nullable<string>;
    updatedAt: DateTime;
    updatedBy?: Nullable<User>;
    updatedById?: Nullable<number>;
    village: Village;
    villageId: number;
}

export interface NaUpload {
    createdAt: DateTime;
    createdBy?: Nullable<User>;
    createdById?: Nullable<number>;
    deletedAt?: Nullable<DateTime>;
    deletedBy?: Nullable<User>;
    deletedById?: Nullable<number>;
    id: number;
    na_form: Na;
    na_formId: number;
    name?: Nullable<string>;
    status: Status;
    updatedAt: DateTime;
    updatedBy?: Nullable<User>;
    updatedById?: Nullable<number>;
    upload_url?: Nullable<string>;
}

export interface IQuery {
    allReportReceived(id: number): NaQuery[] | Promise<NaQuery[]>;
    dashboard(id: number): Dashboard | Promise<Dashboard>;
    getAllDepartmentNa(all: boolean, role: string, skip: number, take: number, userid: number): NaPagination | Promise<NaPagination>;
    getAllNa(skip: number, take: number): NaPagination | Promise<NaPagination>;
    getAllUser(skip: number, take: number): UserPagination | Promise<UserPagination>;
    getAllUserNa(id: number, skip: number, take: number): NaPagination | Promise<NaPagination>;
    getAllVillage(): Village[] | Promise<Village[]>;
    getFeesHistory(id: number): NaFee[] | Promise<NaFee[]>;
    getNaById(id: number): Na | Promise<Na>;
    getPendingNaFee(id: number): NaFee[] | Promise<NaFee[]>;
    getQueryByType(id: number, querytype: QueryType[]): NaQuery[] | Promise<NaQuery[]>;
    getUserById(id: number): User | Promise<User>;
    getUserByRole(role: Role): User[] | Promise<User[]>;
    getUserByRoles(role: Role[]): User[] | Promise<User[]>;
    getVillageById(id: number): Village | Promise<Village>;
    loginUser(loginAuthInput: LoginAuthInput): User | Promise<User>;
    naApplicant(id: number): NaApplicant | Promise<NaApplicant>;
    naSurvey(id: number): NaSurvey | Promise<NaSurvey>;
    naUpload(id: number): NaUpload | Promise<NaUpload>;
}

export interface User {
    alias?: Nullable<string>;
    contact: string;
    contact_two?: Nullable<string>;
    firstName: string;
    id: number;
    lastName: string;
    otp?: Nullable<string>;
    password?: Nullable<string>;
    role: Role;
}

export interface UserPagination {
    data: User[];
    skip: number;
    take: number;
    total: number;
}

export interface Village {
    id: number;
    name: string;
    status: Status;
}

export type DateTime = any;
type Nullable<T> = T | null;
