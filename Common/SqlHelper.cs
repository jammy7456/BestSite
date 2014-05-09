using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;

namespace Common
{
    public class SqlHelper
    {
        public static DataTable GetDatatoDT(string SQLCon, string SQLString, string TBName)
        {
            DataSet ds1 = new DataSet();

            ds1 = ds_fill_1(SQLCon, SQLString, ds1, TBName);

            return ds1.Tables[TBName];
        }

        private static DataSet ds_fill_1(string SQLCon, string SQLString, DataSet ds_1, string TBName)
        {
            SqlConnection sqlCon;
            SqlDataAdapter sqlDa;
            SqlCommand cmd;


            if (ds_1.Tables.Contains(TBName))
            {
                ds_1.Tables.Remove(TBName);

            }

            string commandText = SQLString;
            sqlCon = new SqlConnection();

            sqlCon.ConnectionString = SQLCon;
            cmd = new SqlCommand();
            cmd.Connection = sqlCon;
            cmd.CommandType = CommandType.Text;
            cmd.CommandText = commandText;
            cmd.CommandTimeout = 300;

            sqlDa = new SqlDataAdapter();
            sqlDa.SelectCommand = cmd;

            try
            {
                sqlDa.Fill(ds_1, TBName);
            }
            catch (Exception)
            {
                //MessageBox.Show(ex.Message);
            }
            finally
            {
                sqlDa.Dispose();
                cmd.Dispose();
                sqlCon.Dispose();
            }

            return ds_1;

        }
    }
}
