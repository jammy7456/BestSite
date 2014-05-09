using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.Data;
using System.Web.Script.Serialization;

namespace Common
{
    public class CommonMethod
    {

        public static string DataTableToLoadOnceResult(DataTable dt)
        {

            LoadOnceResult lor = new LoadOnceResult();

            List<ColProp> colProps = new List<ColProp>();

            foreach (DataColumn col in dt.Columns)
            {
                string colName = col.ColumnName;

                var colProp = new ColProp
                {
                    name = colName,
                    index = colName
                    //width = 100
                };
                //var colDataType = col.DataType;
                //if (colDataType.IsValueType && colDataType == typeof(double))
                //{
                //    colProp.formatter = "number";
                //    colProp.formatoptions = "defaultValue:'&nbsp;',thousandsSeparator: ''";
                //    colProp.editrules = "number:true";
                //    colProp.align = "right";
                //    colProp.summaryType = "sum";
                //}

                colProps.Add(colProp);
            }

            string dataJson = JqgridDataTable2Json(dt);

            lor.dataModel = string.Format("[{0}]", string.Join(",", colProps));
            lor.dataJson = dataJson;

            string json = JsonEncode(lor);

            return json;
        }

        private static string JqgridDataTable2Json(DataTable dt)
        {
            ArrayList dataAll = new ArrayList();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow row = dt.Rows[i];

                Hashtable record = new Hashtable();
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    object cellValue = row[j];
                    if (cellValue.GetType() == typeof(DBNull))
                    {
                        cellValue = null;
                    }
                    record[dt.Columns[j].ColumnName] = cellValue;
                }
                dataAll.Add(record);
            }


            //实现一个内存分页
            ArrayList data = new ArrayList();
            //int start = index * size, end = start + size;

            for (int i = 0, l = dataAll.Count; i < l; i++)
            {
                Hashtable record = (Hashtable)dataAll[i];
                if (record == null) continue;
                //if (start <= i && i < end)
                //{
                    data.Add(record);
                //}
            }

            Hashtable ht = new Hashtable();
            ht["page"] = 1;
            ht["records"] = "20";
            ht["total"] = dataAll.Count;

            ht["rows"] = data;

            string json = JsonEncode(ht);

            //string json = new JavaScriptSerializer().Serialize(ht);

            return json;
        }

        public static string EasyUIDataTablePage2Json(DataTable dt, int index, int size)
        {
            ArrayList dataAll = new ArrayList();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow row = dt.Rows[i];

                Hashtable record = new Hashtable();
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    object cellValue = row[j];
                    if (cellValue.GetType() == typeof(DBNull))
                    {
                        cellValue = null;
                    }
                    record[dt.Columns[j].ColumnName] = cellValue;
                }
                dataAll.Add(record);
            }


            //实现一个内存分页
            ArrayList data = new ArrayList();
            int start = index * size, end = start + size;

            for (int i = 0, l = dataAll.Count; i < l; i++)
            {
                Hashtable record = (Hashtable)dataAll[i];
                if (record == null) continue;
                if (start <= i && i < end)
                {
                    data.Add(record);
                }
            }

            Hashtable ht = new Hashtable();
            ht["rows"] = data;
            ht["total"] = dataAll.Count;

            string json = JsonEncode(ht);

            return json;
        }

        public static string ZMJUIDataTablePage2Json(DataTable dt, int index, int size)
        {
            ArrayList dataAll = new ArrayList();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow row = dt.Rows[i];

                Hashtable record = new Hashtable();
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    object cellValue = row[j];
                    if (cellValue.GetType() == typeof(DBNull))
                    {
                        cellValue = null;
                    }
                    record[dt.Columns[j].ColumnName] = cellValue;
                }
                dataAll.Add(record);
            }


            //实现一个内存分页
            ArrayList data = new ArrayList();
            int start = index * size, end = start + size;

            for (int i = 0, l = dataAll.Count; i < l; i++)
            {
                Hashtable record = (Hashtable)dataAll[i];
                if (record == null) continue;
                if (start <= i && i < end)
                {
                    data.Add(record);
                }
            }

            Hashtable ht = new Hashtable();
            ht["data"] = data;
            ht["total"] = dataAll.Count;

            string json = JsonEncode(ht);

            return json;
        }

        public static string ZMJUIEF2Json<T>(IQueryable<T> orderbyedlist, int index, int size)
        {
            var data = orderbyedlist.Skip(index * size).Take(size).ToArray();
            
            Hashtable ht = new Hashtable();
            ht["data"] = data;
            ht["total"] = orderbyedlist.Count();

            string json = JsonEncode(ht);

            return json;
        }

        private static string JsonEncode(object o)
        {
            string DateTimeFormat = "yyyy-MM-dd HH:mm:ss";

            if (o == null)
            {
                return null;
            }
            if ((o != null) && ((o.GetType() == typeof(string)) || (o.GetType() == typeof(string))))
            {
                return o.ToString();
            }

            Newtonsoft.Json.Converters.IsoDateTimeConverter converter = new Newtonsoft.Json.Converters.IsoDateTimeConverter
            {
                DateTimeFormat = DateTimeFormat
            };


            return Newtonsoft.Json.JsonConvert.SerializeObject(o, new Newtonsoft.Json.JsonConverter[] { converter });
        }


    }

    public class LoadOnceResult
    {

        public string dataModel;

        public string dataJson;

    }

    public class ColProp
    {
        //定义列属性和默认值

        public string name;

        public string index;

        public bool sortable = true;

        public bool hidden = false;

        public double width = 150;

        public bool editable = false;

        //Possible values: left, center, right.
        public string align = "left";
        
        public override string ToString()
        {
            return string.Format("{{name:\"{0}\",index:\"{1}\",sortable:{2},hidden:{3}," +
                            "width:{4},editable:{5}}}",
                            name,
                            index,
                            sortable.ToString().ToLower(),
                            hidden.ToString().ToLower(),
                            width,
                            editable.ToString().ToLower()
                            );
        }
    }


}
