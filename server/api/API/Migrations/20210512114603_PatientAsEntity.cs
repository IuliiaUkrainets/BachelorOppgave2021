using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class PatientAsEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalImages_AspNetUsers_PatientId",
                table: "MedicalImages");

            migrationBuilder.DropColumn(
                name: "ExtraInfo",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Middlename",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SSN",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SSN = table.Column<string>(type: "TEXT", nullable: true),
                    FirstName = table.Column<string>(type: "TEXT", nullable: true),
                    Middlename = table.Column<string>(type: "TEXT", nullable: true),
                    LastName = table.Column<string>(type: "TEXT", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Created = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Gender = table.Column<string>(type: "TEXT", nullable: true),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    City = table.Column<string>(type: "TEXT", nullable: true),
                    ExtraInfo = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalImages_Patients_PatientId",
                table: "MedicalImages",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalImages_Patients_PatientId",
                table: "MedicalImages");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.AddColumn<string>(
                name: "ExtraInfo",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Middlename",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SSN",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalImages_AspNetUsers_PatientId",
                table: "MedicalImages",
                column: "PatientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
