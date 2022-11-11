<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "title">
        Access Code Form
    <#elseif section = "header">
        Access Code Form
    <#elseif section = "form">
        <h2>${msg("loginTitleHtml",(realm.displayName!''))}</h2>
        <hr size=1 />
        <form action="${url.loginAction}" class="${properties.kcFormClass!}" id="kc-u2f-login-form" method="post">
            <h3>${msg("loginAuthCodeInput")}</h3>
            <p>
                ${msg("loginAuthMessage")}
            </p>
            <div class="${properties.kcFormGroupClass!}">
                <label for="emailCode">${msg("loginAuthCode")}</label>
                <input id="emailCode" name="emailCode" type="text" inputmode="numeric" pattern="[0-9]*"/>
            </div>

            <input name="resend" id="resend"
                   class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}"
                   type="submit" value="${msg("resendCode")}"/>
            <hr size=1 />

            <input id="kc-login" class="mt-min ${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}"
                   type="submit" value="${msg("loginAuthenticate")}"/>



            <#--  <input name="cancel"
                   class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}"
                   type="submit" value="${msg("doCancel")}"/>  -->
        </form>
    </#if>
</@layout.registrationLayout>