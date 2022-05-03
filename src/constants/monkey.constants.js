export const TraitNames = {
    Name: 'Monkey Name',
    ID: 'Monkey ID',
    Parents: 'Monkey Parents',
    Gener: 'Monkey Gender',
    DOB: 'Monkey Date of Birth',
    AlphaScore: 'Alpha Score',
    Color: 'Color',
    Tattoo: 'Tattoo',
    Hairstyle: 'Hairstyle',
    Eyes: 'Eyes',
    Mouth: 'Mouth',
    Nose: 'Nose',
    Ears: 'Ears',
    Arms: 'Arms',
    Legs: 'Legs',
    Outfit: 'Outfit',
    Pattern: 'Pattern Style',
    Accuracy: 'Accuracy',
    MaxAccuracy: 'Max Accuracy',
    Passing: 'Passing',
    MaxPassing: 'Max Passing',
    Defense: 'Defense',
    MaxDefense: 'Max Defense',
    Control: 'Control',
    MaxControl: 'Max Control',
    PrecisionShot: 'Precision Shot',
    ProtectiveHolding: 'Protective Holding',
    HardHeader: 'Hard Header',
    FlankPass: 'Flank Pass',
    ExtremePressing: 'Extreme Pressing',
    PassInterception: 'Pass Interception',
    HardTackle: 'Hard Tackle',
    DefensiveAwareness: 'Defensive Awareness',
    LastStandDefense: 'Last Stand Defense',
    GoldenGloves: 'Golden Gloves',
    GoalieResistance: 'Goalie Resistance',
    GoalieLongBall: 'Goalie Long Ball',
    Evolution: 'Monkey evolution history',
    Type: 'Type',
    Created: 'Created'
}

export const Skills = {
    Accuracy: TraitNames.Accuracy,
    Control: TraitNames.Control,
    Defense: TraitNames.Defense,
    Passing: TraitNames.Passing,
    MaxAccuracy: TraitNames.MaxAccuracy,
    MaxControl: TraitNames.MaxControl,
    MaxDefense: TraitNames.MaxDefense,
    MaxPassing: TraitNames.MaxPassing,
}

export const Perks = {
    PrecisionShot: TraitNames.PrecisionShot,
    ProtectiveHolding: TraitNames.ProtectiveHolding,
    HardHeader: TraitNames.HardHeader,
    FlankPass: TraitNames.FlankPass,
    ExtremePressing: TraitNames.ExtremePressing,
    PassInterception: TraitNames.PassInterception,
    HardTackle: TraitNames.HardTackle,
    DefensiveAwareness: TraitNames.DefensiveAwareness,
    LastStandDefense: TraitNames.LastStandDefense,
    GoldenGloves: TraitNames.GoldenGloves,
    GoalieResistance: TraitNames.GoalieResistance,
    GoalieLongBall: TraitNames.GoalieLongBall,
}

export const FieldPositionNames = {
    Striker: 'striker',
    Midfielder: 'midfielder',
    Defender: 'defender',
    Goalkeeper: 'goalkeeper'
}

export const FieldPositionPerks_Weighted = [
    {
        FieldPosition: FieldPositionNames.Striker,
        Skills: [
            {
                Name: Skills.MaxAccuracy,
                Weight: 4
            },
            {
                Name: Skills.MaxControl,
                Weight: 3
            },
            {
                Name: Skills.MaxPassing,
                Weight: 2
            },
            {
                Name: Skills.MaxDefense,
                Weight: 1
            }
        ],
        Perks: [Perks.PrecisionShot, Perks.ProtectiveHolding, Perks.HardHeader]
    },
    {
        FieldPosition: FieldPositionNames.Midfielder,
        Skills: [
            {
                Name: Skills.MaxAccuracy,
                Weight: 2
            },
            {
                Name: Skills.MaxControl,
                Weight: 3
            },
            {
                Name: Skills.MaxPassing,
                Weight: 4
            },
            {
                Name: Skills.MaxDefense,
                Weight: 1
            }
        ],
        Perks: [Perks.FlankPass, Perks.ExtremePressing, Perks.PassInterception]
    },
    {
        FieldPosition: FieldPositionNames.Defender,
        Skills: [
            {
                Name: Skills.MaxAccuracy,
                Weight: 1
            },
            {
                Name: Skills.MaxControl,
                Weight: 2
            },
            {
                Name: Skills.MaxPassing,
                Weight: 3
            },
            {
                Name: Skills.MaxDefense,
                Weight: 4
            }
        ],
        Perks: [Perks.HardTackle, Perks.DefensiveAwareness, Perks.LastStandDefense]
    },
    {
        FieldPosition: FieldPositionNames.Goalkeeper,
        Skills: [
            {
                Name: Skills.MaxAccuracy,
                Weight: 1
            },
            {
                Name: Skills.MaxControl,
                Weight: 3
            },
            {
                Name: Skills.MaxPassing,
                Weight: 2
            },
            {
                Name: Skills.MaxDefense,
                Weight: 4
            }
        ],
        Perks: [Perks.GoldenGloves, Perks.GoalieResistance, Perks.GoalieLongBall]
    }
]

export const FieldPositionPerks = [
    {
        FieldPosition: FieldPositionNames.Striker,
        Skills: [
            {
                Name: Skills.MaxAccuracy,
                Weight: 1
            },
            {
                Name: Skills.MaxControl,
                Weight: 1
            },
            {
                Name: Skills.MaxPassing,
                Weight: 0
            },
            {
                Name: Skills.MaxDefense,
                Weight: 0
            }
        ],
        Perks: [Perks.PrecisionShot, Perks.ProtectiveHolding, Perks.HardHeader]
    },
    {
        FieldPosition: FieldPositionNames.Midfielder,
        Skills: [
            {
                Name: Skills.MaxAccuracy,
                Weight: 0
            },
            {
                Name: Skills.MaxControl,
                Weight: 1
            },
            {
                Name: Skills.MaxPassing,
                Weight: 1
            },
            {
                Name: Skills.MaxDefense,
                Weight: 0
            }
        ],
        Perks: [Perks.FlankPass, Perks.ExtremePressing, Perks.PassInterception]
    },
    {
        FieldPosition: FieldPositionNames.Defender,
        Skills: [
            {
                Name: Skills.MaxAccuracy,
                Weight: 0
            },
            {
                Name: Skills.MaxControl,
                Weight: 0
            },
            {
                Name: Skills.MaxPassing,
                Weight: 1
            },
            {
                Name: Skills.MaxDefense,
                Weight: 1
            }
        ],
        Perks: [Perks.HardTackle, Perks.DefensiveAwareness, Perks.LastStandDefense]
    },
    {
        FieldPosition: FieldPositionNames.Goalkeeper,
        Skills: [
            {
                Name: Skills.MaxAccuracy,
                Weight: 0
            },
            {
                Name: Skills.MaxControl,
                Weight: 1
            },
            {
                Name: Skills.MaxPassing,
                Weight: 0
            },
            {
                Name: Skills.MaxDefense,
                Weight: 1
            }
        ],
        Perks: [Perks.GoldenGloves, Perks.GoalieResistance, Perks.GoalieLongBall]
    }
]

export const MAX_PERKS_STRIKER = 0.63

export const MAX_PERKS_MIDFIELDER = 0.60

export const MAX_PERKS_DEFENDER = 0.59

export const MAX_PERKS_GOALKEEPER = 0.58

export const MAX_STATS = 400
