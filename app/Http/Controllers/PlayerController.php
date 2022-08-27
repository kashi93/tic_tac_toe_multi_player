<?php

namespace App\Http\Controllers;

use App\Events\SessionList;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class PlayerController extends Controller
{
    public function openSession(Request $request)
    {
        $selected_session = null;
        $session_list = Cache::get('session-list') ?? [];

        for ($i = 0; $i < count($session_list); $i++) {
            $session = $session_list[$i];

            if ($session['player_2'] == null) {
                $session_list[$i]['player_2'] = $request->input('player_name');
                $selected_session = $session_list[$i];
            }
        }

        if ($selected_session == null) {
            $selected_session = [
                'session' => Str::random(100),
                'player_1' => $request->input('player_name'),
                'player_2' => null,
                'game_state' => ["", "", "", "", "", "", "", "", ""],
                "last_player_turn" => "X"
            ];

            $session_list[] = $selected_session;
        } else {
            broadcast(new SessionList($session_list));
        }

        Cache::put('session-list', $session_list, Carbon::now('Asia/Kuala_Lumpur')->addDay(1));

        return response([
            'session' => $selected_session
        ]);
    }

    public function playerMove(Request $request)
    {
        $session_list = Cache::get('session-list') ?? [];
        $index = collect($session_list)->where('session', $request->input('session'))->keys()[0] ?? -1;

        if ($index != -1) {
            $session_list[$index]['game_state'][$request->input('index')] = $request->input('myKey');
            $session_list[$index]['last_player_turn'] = $request->input('myKey');
        }

        Cache::put('session-list', $session_list, Carbon::now('Asia/Kuala_Lumpur')->addDay(1));

        broadcast(new SessionList($session_list));

        return response([
            'session' => true
        ]);
    }
}
