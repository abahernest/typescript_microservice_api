import { Model, AllowNull, AutoIncrement, Column, NotEmpty, PrimaryKey, Table } from "sequelize-typescript";

export interface PhoneInterface{
    id?: number | null,
    number?:    string,
    account_id?:   number
}

@Table({
    tableName: "phone_number",
})
export default class PhoneNumber extends Model implements PhoneInterface{
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    number!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    account_id!: number;
}