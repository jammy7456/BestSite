<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="WebForm1.aspx.cs" Inherits="BestSite.WebForm1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    模块名称
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="HeadContent" runat="server">
    <script type="text/javascript">

        $(document).ready(function () {

            var dataNames;
            var dataModel;
            var dataJson;


            $.ajax({
                url: "AjaxHandler/Service.ashx?method=JqgridGetModels",
                async: false,
                dataType:'json',
                success: function (json) {
                    dataNames = eval(json.dataNames);
                    dataModel = eval(json.dataModel);
                    dataJson = json.dataJson;
                },
                complete: function () {
                    jQuery("#maingrid").jqGrid({
                        datatype: "jsonstring",
                        datastr:dataJson,
//                        colNames: dataNames,
                        colModel: dataModel,
                        height: 300,
                        //autowidth:true,
                        jsonReader: {
                            repeatitems: false
                        },
                        rowNum: 20,
                        rowList: [10, 20, 30],
                        pager: '#pager',
                        viewrecords: true,
                        loadonce: true,
                        caption: "Basic Jqgrid"
                    });
                }
            });




        })

    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentHeadTitle" runat="server">
    模块名称
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentMainDetail" runat="server">
    <table id="maingrid"></table>
    <div id="pager"></div>
</asp:Content>
