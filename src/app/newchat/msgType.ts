export enum MESSAGE_TYPE {
    TEXT = "text",
    IMAGE = "img",
    VIDEO = "vid"
};

export enum MESSAGE_STATUS {
    OFFLINE = "offline",
    SEND = "send",
    RECEIVED = "recieved",
    SEEN = 'seen'
};

// function minDis(s1, s2, n, m, dp) {
//     // If any String is empty,
//     // return the remaining characters of other String
//     if (n == 0)
//         return m;
//     if (m == 0)
//         return n;

//     // To check if the recursive tree
//     // for given n & m has already been executed
//     if (dp[n][m] != -1)
//         return dp[n][m];

//     // If characters are equal, execute
//     // recursive function for n-1, m-1
//     if (s1[n - 1] == s2[m - 1]) {
//         if (dp[n - 1][m - 1] == -1) {
//             return dp[n][m] = minDis(s1, s2, n - 1, m - 1, dp);
//         }
//         else
//             return dp[n][m] = dp[n - 1][m - 1];
//     }

//     // If characters are nt equal, we need to

//     // find the minimum cost out of all 3 operations.    
//     else {
//         let m1, m2, m3;        // temp variables 
//         if (dp[n - 1][m] != -1) {
//             m1 = dp[n - 1][m];
//         }
//         else {
//             m1 = minDis(s1, s2, n - 1, m, dp);
//         }

//         if (dp[n][m - 1] != -1) {
//             m2 = dp[n][m - 1];
//         }
//         else {
//             m2 = minDis(s1, s2, n, m - 1, dp);
//         }

//         if (dp[n - 1][m - 1] != -1) {
//             m3 = dp[n - 1][m - 1];
//         }
//         else {
//             m3 = minDis(s1, s2, n - 1, m - 1, dp);
//         }
//         return dp[n][m] = 1 + Math.min(m1, Math.min(m2, m3));
//     }
// }

// // Driver program

// let str1 = "rest";
// let str2 = "pest";

// let n = str1.length, m = str2.length;
// let dp = new Array(n + 1);
// for (let i = 0; i < n + 1; i++) {
//     dp[i] = new Array(m + 1);
//     for (let j = 0; j < m + 1; j++)
//         dp[i][j] = -1;
// }

// console.log(minDis(str1, str2, n, m, dp));