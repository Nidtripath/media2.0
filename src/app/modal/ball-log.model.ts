export class BallLog {
    ball_logs_id!: number;
    bowler_id!: number;
    ball_no!: number;
    display_ball!: number;
    run!:number;
    batsman_id!: number;
    over_logs_id!: number;
    extra_run : number = 0 ;
    extra_type!:string;
    wicket_id!: number;
    is_jackpot_ball!:boolean;
    bowling_side!:string; 
    fielderid!: number;
    is_boundary!:boolean;
   
    

    //my fields
    out_batsman_id!:number;
    is_bye_run:boolean = false;
    is_leg_bye_run:boolean = false;
    is_wide_ball:boolean = false;
    is_no_ball:boolean = false;
    is_dot_one_run:boolean = false;
    is_two_runs:boolean = false;
    is_four_runs:boolean = false;
    is_six_runs:boolean = false;
    isWicket:boolean = false;
    is_Batsman_retd: boolean = false;
    is_three_runs:boolean = false;
    is_five_seven_runs: boolean= false;
    dont_count_ball: boolean = false;
    wicket_type: string="";
    is_four_bye_runs: boolean = false;
    is_six_bye_runs: boolean = false;
    is_freeHit:boolean=false;
}
