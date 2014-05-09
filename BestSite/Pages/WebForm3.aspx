<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="WebForm3.aspx.cs" Inherits="BestSite.WebForm3" %>
<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    模块名称
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="/Scripts/easyui/jquery.easyui.min.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="/Scripts/easyui/themes/default/easyui.css"/>
	<link rel="stylesheet" type="text/css" href="/Scripts/easyui/themes/icon.css"/>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentHeadTitle" runat="server">
    模块名称
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentMainDetail" runat="server">
	<table class="easyui-datagrid" title="Basic DataGrid" style="width:800px;height:250px"
			data-options="singleSelect:true,collapsible:true,url:'AjaxHandler/Service.ashx?method=EasyUIGetEmployeeInfo'">
		<thead>
			<tr>
				<th data-options="field:'loginname',width:180">员工帐号</th>
				<th data-options="field:'name',width:80">姓名</th>
				<th data-options="field:'gender',width:80,align:'right'">性别</th>
				<th data-options="field:'salary',width:80,align:'right'">薪资</th>
				<th data-options="field:'age',width:60">年龄</th>
				<th data-options="field:'createtime',width:200,align:'center'">创建日期</th>
			</tr>
		</thead>
	</table>
</asp:Content>
