<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "title">
        ${msg("loginTitle",realm.name)}
    <#elseif section = "header">
        Setup Secret Question
    <#elseif section = "form">
        <form id="kc-totp-login-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
            <h2>${msg("loginAccountTitle")}</h2>
            <hr size=1 />
            <h3>${msg("firstLogin")}</h3>

            <ul id="forgetNavi" class="half">
                <li class="after">&nbsp;</li>
                <li class="after" >&nbsp;</li>
                <li class="active">&nbsp;</li>
            </ul>


            <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcLabelWrapperClass!}">
                
                    <label for="totp" class="${properties.kcLabelClass!}">${msg("secretAnswerInput")}</label>
                </div>

                <div class="${properties.kcInputWrapperClass!}">
                    <input id="totp" name="secret_answer" type="text" class="${properties.kcInputClass!}" />
                </div>
            </div>
            <hr size=1 class="marginHr"/>
            <div class="${properties.kcFormGroupClass!}">
                <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                    <div class="${properties.kcFormOptionsWrapperClass!}">
                    </div>
                </div>

                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                    <div class="${properties.kcFormButtonsWrapperClass!}">
                        <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}" name="login" id="kc-login" type="submit" value="${msg("doRegist")}"/>
                    </div>
                </div>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>