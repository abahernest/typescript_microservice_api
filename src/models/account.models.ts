import { Model, AllowNull, AutoIncrement, Column, NotEmpty, PrimaryKey, Table } from "sequelize-typescript";

export interface AccountInterface{
    id?: number | null,
    auth_id?:    string,
    username?:   string
}

@Table({
    tableName: "accounts",
})
export default class Account extends Model implements AccountInterface{
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    auth_id!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    username!: string;
}