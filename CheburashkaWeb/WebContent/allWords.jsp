<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>All Words</title>
</head>
<body>
	<h1>All Nouns</h1>

    <h2>${noun }</h2>
    <table>
    <tr><th>English</th><th>Português</th></tr>
    <tr><td>${noun.translations}</td><td>${noun.translations}</td></tr>
    </table>
    <table>
    <tr><th>Case</th><th>Singular</th><th>Plural</th></tr>
    <tr><th>${case }</th><td>${noun.declinations}</td><td>${noun.declinations}</td></tr>
    <tr><th>${case }</th><td>${noun.declinations}</td><td>${noun.declinations}</td></tr>
    <tr><th>${case }</th><td>${noun.declinations}</td><td>${noun.declinations}</td></tr>
    <tr><th>${case }</th><td>${noun.declinations}</td><td>${noun.declinations}</td></tr>
    <tr><th>${case }</th><td>${noun.declinations}</td><td>${noun.declinations}</td></tr>
    <tr><th>${case }</th><td>${noun.declinations}</td><td>${noun.declinations}</td></tr>
    </table>
</body>
</html>