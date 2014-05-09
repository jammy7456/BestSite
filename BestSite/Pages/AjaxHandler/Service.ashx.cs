using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using System.Collections;
using System.Reflection;
using DAL;
using System.Web.Script.Serialization;

namespace BestSite.AjaxHandler
{
    /// <summary>
    /// Service 的摘要说明
    /// </summary>
    public class Service : IHttpHandler, IRequiresSessionState
    {

        public static HttpContext c;

        public void ProcessRequest(HttpContext context)
        {
            c = context;

            string methodName = context.Request["method"];
            Type type = this.GetType();
            MethodInfo method = type.GetMethod(methodName);
            if (method == null) throw new Exception("method is null");


            try
            {
                BeforeInvoke(methodName);
                method.Invoke(this, null);
            }
            catch (Exception ex)
            {
                context.Response.Write(ex.Message);
            }
            finally
            {
                AfterInvoke(methodName);
            }

        }

        //权限管理
        protected void BeforeInvoke(String methodName)
        {
            //Hashtable user = GetUser();
            //if (user.role == "admin" && methodName == "remove") throw .      
        }
        //日志管理
        protected void AfterInvoke(String methodName)
        {
            //log something
        }

        public void ZMJUIGetEmployeeInfo()
        {

            //分页
            int pageIndex = Convert.ToInt32(c.Request["pageIndex"]);
            int pageSize = Convert.ToInt32(c.Request["pageSize"]);

            EmployeeDal ed = new EmployeeDal();

            //业务层：数据库操作
            string json = ed.EFZMJUIGetEmployeeInfo(pageIndex, pageSize);

            c.Response.Write(json);
        }

        public void EasyUIGetEmployeeInfo()
        {

            //分页
            int pageIndex = 0;
            int pageSize = 999;

            EmployeeDal ed = new EmployeeDal();

            //业务层：数据库操作
            string json = ed.EasyUIGetEmployeeInfo(pageIndex, pageSize);

            c.Response.Write(json);
        }

        //public void JqgridGetEmployeeInfo()
        //{

        //    //分页
        //    int pageIndex = 0;
        //    int pageSize = 999;

        //    EmployeeDal ed = new EmployeeDal();

        //    //业务层：数据库操作
        //    string json = ed.JqgridGetEmployeeInfo(pageIndex, pageSize);

        //    c.Response.Write(json);
        //}

        public void JqgridGetModels()
        {
            EmployeeDal ed = new EmployeeDal();

            //业务层：数据库操作



            string json = ed.JqgridGetEmployeeInfo(0, 999);;

            c.Response.Write(json);

        }
        

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }










}