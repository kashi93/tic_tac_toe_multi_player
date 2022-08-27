<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Tic Tac Toe</title>
    <style>
        body {
            font-family: "Arial", sans-serif;
        }

        section {
            margin-top: 35px;
            text-align: center;
        }

        .game--title {
            font-size: 100px;
            color: #d7a62f;
            margin: 10px auto;
        }

        .game--container {
            display: grid;
            grid-template-columns: repeat(3, auto);
            width: 306px;
            margin: 10px auto;
            background-color: #11213a;
            color: #04c0b2;
        }

        .cell {
            font-family: "Permanent Marker", cursive;
            width: 100px;
            height: 100px;
            box-shadow: 2px 2px 2px 2px #ecd7ba;
            border: 2px solid #ecd7ba;
            cursor: pointer;
            line-height: 100px;
            font-size: 60px;
        }

        .game--status {
            font-size: 30px;
            color: #d7a62f;
            margin: 20px auto;
        }

        .game--restart {
            background-color: #f7e4ac;
            width: 200px;
            height: 50px;
            font-size: 25px;
            color: #5586e2;
            box-shadow: 2px 2px 2px 2px #d86c23;
            border: 2px solid #d86c23;
        }
    </style>
</head>

<body>
    <section>
        <div class="game--container">
            <div data-cell-index="0" class="cell"></div>
            <div data-cell-index="1" class="cell"></div>
            <div data-cell-index="2" class="cell"></div>
            <div data-cell-index="3" class="cell"></div>
            <div data-cell-index="4" class="cell"></div>
            <div data-cell-index="5" class="cell"></div>
            <div data-cell-index="6" class="cell"></div>
            <div data-cell-index="7" class="cell"></div>
            <div data-cell-index="8" class="cell"></div>
        </div>
        <h2 class="game--status"></h2>
    </section>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="{{mix('js/app.js')}}"></script>
</body>

</html>