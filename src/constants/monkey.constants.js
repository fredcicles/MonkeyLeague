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
    Passing: TraitNames.Passing
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

export const FieldPositionPerks = [
    {
        FieldPosition: FieldPositionNames.Striker,
        Skills: [
            {
                Name: Skills.Accuracy,
                Weight: 4
            },
            {
                Name: Skills.Control,
                Weight: 3
            },
            {
                Name: Skills.Passing,
                Weight: 2
            },
            {
                Name: Skills.Defense,
                Weight: 1
            }
        ],
        Perks: [Perks.PrecisionShot, Perks.ProtectiveHolding, Perks.HardHeader]
    },
    {
        FieldPosition: FieldPositionNames.Midfielder,
        Skills: [
            {
                Name: Skills.Accuracy,
                Weight: 2
            },
            {
                Name: Skills.Control,
                Weight: 3
            },
            {
                Name: Skills.Passing,
                Weight: 4
            },
            {
                Name: Skills.Defense,
                Weight: 1
            }
        ],
        Perks: [Perks.FlankPass, Perks.ExtremePressing, Perks.PassInterception]
    },
    {
        FieldPosition: FieldPositionNames.Defender,
        Skills: [
            {
                Name: Skills.Accuracy,
                Weight: 1
            },
            {
                Name: Skills.Control,
                Weight: 2
            },
            {
                Name: Skills.Passing,
                Weight: 3
            },
            {
                Name: Skills.Defense,
                Weight: 4
            }
        ],
        Perks: [Perks.HardTackle, Perks.DefensiveAwareness, Perks.LastStandDefense]
    },
    {
        FieldPosition: FieldPositionNames.Goalkeeper,
        Skills: [
            {
                Name: Skills.Accuracy,
                Weight: 2
            },
            {
                Name: Skills.Control,
                Weight: 3
            },
            {
                Name: Skills.Passing,
                Weight: 1
            },
            {
                Name: Skills.Defense,
                Weight: 4
            }
        ],
        Perks: [Perks.GoldenGloves, Perks.GoalieResistance, Perks.GoalieLongBall]
    }
]