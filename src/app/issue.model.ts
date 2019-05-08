export interface Issue {
    id: String;  // backend generated
    title: String;
    description: String;
    docs: Array<String>;
    assignee: String;
    status: String;   
    reporter: String; //backend generate
    date: Date; // backend generated
}