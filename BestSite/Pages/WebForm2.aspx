<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="WebForm2.aspx.cs" Inherits="BestSite.WebForm2" %>
<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    模块名称
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="/Scripts/loadzmjui.js" type="text/javascript"></script>
    <script type="text/javascript">

        $(function () {
            zmj.parse();

            var grid = zmj.get("datagrid1");

            grid.url = "AjaxHandler/Service.ashx?method=ZMJUIGetEmployeeInfo";

            grid.load();        
        
         });


    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentHeadTitle" runat="server">
    模块名称
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentMainDetail" runat="server">
    <asp:Button ID="Button1" runat="server" Text="Button" 
        onclick="Button1_Click1" />
<div id="datagrid1" class="zmj-datagrid" style="width:700px;height:280px;" 
    allowAlternating = "true"
    allowResize="true" sizeList="[20,30,50,100]" pageSize="20" 
>
    <div property="columns">
        <div type="indexcolumn" ></div>
        <div field="loginname" width="120" headerAlign="center" allowSort="true">员工帐号</div>    
        <div field="name" width="120" headerAlign="center" allowSort="true">姓名</div>                            
        <div field="gender" width="100" renderer="onGenderRenderer" align="center" headerAlign="center">性别</div>
        <div field="salary" dataType="currency" currencyUnit="￥" align="right" width="100" allowSort="true">薪资</div>                                
        <div field="age" width="100" allowSort="true">年龄</div>
        <div field="createtime" width="100" headerAlign="center" dateFormat="yyyy-MM-dd" allowSort="true">创建日期</div>                
    </div>
</div>
</form>
</asp:Content>
