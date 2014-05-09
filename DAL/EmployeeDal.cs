using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.Data;
using Common;


namespace DAL
{
    public class EmployeeDal : SampleDBEntities
    {
        string con = "Data Source=.; Database=SampleDB;Persist Security Info=True;User ID=sa;Password=12345678";

        public string ZMJUIGetEmployeeInfo(int index, int size)
        {
            string sql = "SELECT * FROM t_employee";

            DataTable dt = Common.SqlHelper.GetDatatoDT(con, sql, "t1");

            string json = CommonMethod.ZMJUIDataTablePage2Json(dt, index, size);

            return json;
        }

        public string EFZMJUIGetEmployeeInfo(int index, int size)
        {
            var emptable = t_employee.OrderBy(t=>t.id);

            string json = CommonMethod.ZMJUIEF2Json(emptable, index, size);

            return json;
        }




        public string EasyUIGetEmployeeInfo(int index, int size)
        {
            string sql = "SELECT * FROM t_employee";
            DataTable dt = Common.SqlHelper.GetDatatoDT(con, sql, "t1");

            string json = CommonMethod.EasyUIDataTablePage2Json(dt, index, size);

            return json;
        }

        public string JqgridGetEmployeeInfo(int index, int size)
        {
            string sql = "SELECT [name],[age],[birthday],[dept_id],[gender],[salary],[createtime],[email] FROM t_employee";
            DataTable dt = Common.SqlHelper.GetDatatoDT(con, sql, "t1");

            string json = CommonMethod.DataTableToLoadOnceResult(dt);

            return json;
        }

    }




}
