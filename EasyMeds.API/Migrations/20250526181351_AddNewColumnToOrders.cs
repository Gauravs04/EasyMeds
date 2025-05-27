using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyMeds.API.Migrations
{
    /// <inheritdoc />
    public partial class AddNewColumnToOrders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SupplierId",
                table: "Orders",
                type: "uniqueidentifier",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SupplierId",
                table: "Orders");
        }
    }
}
