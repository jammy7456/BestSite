using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

//解决ctor错误
namespace System.Runtime.CompilerServices
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class | AttributeTargets.Assembly)]
    internal sealed class ExtensionAttribute : Attribute { }
}

public static class JsonHelper
{

    public static string JsonEncode(this object o)
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

    public static object JsonDecode(this string json)
    {
        if (string.IsNullOrEmpty(json))
        {
            return "";
        }
        object obj2 = Newtonsoft.Json.JsonConvert.DeserializeObject(json);
        if ((obj2.GetType() == typeof(string)) || (obj2.GetType() == typeof(string)))
        {
            obj2 = Newtonsoft.Json.JsonConvert.DeserializeObject(obj2.ToString());
        }
        return Deserialize(obj2);
    }

    private static object Deserialize(object obj1)
    {
        if (obj1 == null)
        {
            return null;
        }
        if (obj1.GetType() == typeof(string))
        {
            string str = obj1.ToString();
            if ((((str.Length == 19) && (str[10] == 'T')) && (str[4] == '-')) && (str[13] == ':'))
            {
                obj1 = Convert.ToDateTime(obj1);
            }
            return obj1;
        }
        if (obj1 is Newtonsoft.Json.Linq.JObject)
        {
            Newtonsoft.Json.Linq.JObject obj2 = obj1 as Newtonsoft.Json.Linq.JObject;
            System.Collections.Hashtable hashtable = new System.Collections.Hashtable();
            foreach (System.Collections.Generic.KeyValuePair<string, Newtonsoft.Json.Linq.JToken> pair in obj2)
            {
                hashtable[pair.Key] = Deserialize(pair.Value);
            }
            obj1 = hashtable;
            return obj1;
        }
        if (obj1 is System.Collections.IList)
        {
            System.Collections.ArrayList list = new System.Collections.ArrayList();
            list.AddRange(obj1 as System.Collections.IList);
            int num = 0;
            int count = list.Count;
            while (num < count)
            {
                list[num] = Deserialize(list[num]);
                num++;
            }
            obj1 = list;
            return obj1;
        }
        if (typeof(Newtonsoft.Json.Linq.JValue) == obj1.GetType())
        {
            Newtonsoft.Json.Linq.JValue value2 = (Newtonsoft.Json.Linq.JValue)obj1;
            obj1 = Deserialize(value2.Value);
        }
        return obj1;
    }
}