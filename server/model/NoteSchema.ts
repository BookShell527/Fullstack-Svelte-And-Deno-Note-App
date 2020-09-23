interface Note {
    _id: {
        $oid: string;
    };
    title: string;
    description: string;
    date: Date;
}

interface InsertNote {
    _id?: {
        $oid: string;
    };
    title: string;
    description: string;
    date: Date;
}

export type { Note, InsertNote }