<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="BestSite.Login" %>
<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    登陆
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="HeadContent" runat="server">
<script type="text/javascript">
    $(document).ready(function () {
        $(':submit').click(function (e) {
            $("form").each(function () {
                $(this).validate();
            });
        })
    })
</script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentHeadTitle" runat="server">
    登陆
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentMainDetail" runat="server">
    <asp:Login ID="LoginUser" runat="server" EnableViewState="true" RenderOuterTable="false">
        <LayoutTemplate>
            <div class="failureNotification">
                <asp:Literal ID="FailureText" runat="server"></asp:Literal>
            </div>
            <div class="accountInfo">
                <fieldset class="login">
                    <legend>Account Information</legend>
                    <p>
                        <asp:Label ID="UserNameLabel" runat="server" CssClass="lbl-display" AssociatedControlID="UserName"><%: Resource.UserName %>:</asp:Label>
                        <asp:TextBox ID="UserName" runat="server" CssClass="txt-field textEntry required"></asp:TextBox>
                    </p>
                    <p>
                        <asp:Label ID="PasswordLabel" runat="server" CssClass="lbl-display" AssociatedControlID="Password"><%: Resource.PassWord %>:</asp:Label>
                        <asp:TextBox ID="Password" runat="server" CssClass="txt-field passwordEntry required"
                            TextMode="Password"></asp:TextBox>
                    </p>
                    <p>
                        <asp:CheckBox ID="RememberMe" runat="server" />
                        <asp:Label ID="RememberMeLabel" runat="server" AssociatedControlID="RememberMe" CssClass="inline"><%: Resource.RememberMe %></asp:Label>
                    </p>
                    <p class="submitButton">
                        <asp:Button ID="LoginButton" runat="server" CssClass="action" CommandName="Login"
                            Text='登陆' ValidationGroup="LoginUserValidationGroup" />
                    </p>
                </fieldset>
            </div>
        </LayoutTemplate>
    </asp:Login>
</asp:Content>
